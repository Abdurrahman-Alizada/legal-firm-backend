import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { MongoRepository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { RegisterDto } from "./dto/register.dto";
import { Role } from "../role/entities/role.entity";
import { compare, hash } from "bcrypt";
import { Company } from "../company/entities/company.entity";
import { CompanyType, RoleName } from "src/types";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";
import { isValidObjectId } from "src/utils/validations";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { MailService } from "../email/email.service";
import { InviteUserDto } from "./dto/invite-user.dto";
import { AcceptInviteDto } from "./dto/accept-invite.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: MongoRepository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: MongoRepository<Role>,
    @InjectRepository(Company)
    private readonly companyRepo: MongoRepository<Company>,

    private jwtService: JwtService,
    private mailService: MailService
  ) {}
  async register(dto: RegisterDto) {
    const isIdValid = isValidObjectId(dto.roleId);

    console.log({ isIdValid });
    if (!isIdValid) {
      throw new BadRequestException("Invalid Role Id. No such Role exists.");
    }
    const role = await this.roleRepo.findOne({
      where: { _id: new ObjectId(dto.roleId) },
    });

    console.log({ role });

    if (!role || !role.isSignUpAllowed) {
      throw new BadRequestException("Invalid role is selected");
    }

    const existingUser = await this.userRepo.findOneBy({ email: dto.email });
    if (existingUser) throw new ConflictException("Email already exists");

    const hashed = await hash(dto.password, 10);

    const user = this.userRepo.create({
      ...dto,
      password: hashed,
      isCompanyOwner: true,
    });

    await this.userRepo.save(user);

    const firm = this.companyRepo.create({
      name: `${user.name}'s Firm`,
      type: role.name == RoleName.LAWYER ? CompanyType.LAW : CompanyType.CLIENT,
      ownerId: user._id,
      memberIds: [user._id],
    });

    await this.companyRepo.save(firm);

    user.companyId = firm._id;
    await this.userRepo.save(user);

    return {
      data: {
        user,
        role: { _id: role._id, name: role.name, description: role.description },
      },
      message: "User created successfully",
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });

    if (!user) throw new BadRequestException("Invalid credentials");

    const isMatch = await compare(dto.password, user.password);
    if (!isMatch) throw new BadRequestException("Invalid credentials");

    const isIdValid = isValidObjectId(user.roleId);

    if (!isIdValid) {
      throw new BadRequestException("Invalid Role Id. No such Role exists.");
    }
    const role = await this.roleRepo.findOne({
      where: { _id: new ObjectId(user.roleId) },
    });

    console.log({ role });

    if (!role || !role.isSignUpAllowed) {
      throw new BadRequestException("Invalid role. Not allowed to login.");
    }

    const payload = {
      _id: user._id,
      email: user.email,
      role: {
        _id: user.roleId,
        name: role.name,
        description: role.description,
      },
      companyId: user.companyId,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      accessToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: {
          _id: user.roleId,
          name: role.name,
          description: role.description,
        },
        companyId: user.companyId,
      },
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new NotFoundException("No user with this email");

    const token = this.jwtService.sign({ _id: user._id }, { expiresIn: "15m" });

    const resetUrl = `https://your-app.com/reset-password?token=${token}`;

    console.log({ token });

    await this.mailService.sendResetPasswordEmail(user.email, resetUrl);

    return { message: "Reset link sent to email if it exists." };
  }

  async resetPassword(dto: ResetPasswordDto) {
    let decoded: any;
    try {
      decoded = await this.jwtService.verifyAsync(dto.token);
    } catch (err) {
      throw new BadRequestException("Invalid or expired token");
    }

    const user = await this.userRepo.findOne({
      where: { _id: new ObjectId(decoded._id) },
    });
    if (!user) throw new NotFoundException("User not found");

    user.password = await hash(dto.newPassword, 10);
    await this.userRepo.save(user);

    return { message: "Password reset successful" };
  }

  async inviteUser(dto: InviteUserDto, owner: User) {
    if (!owner.isCompanyOwner || !owner.companyId) {
      throw new ForbiddenException("Only company owners can invite users");
    }

    const existing = await this.userRepo.findOneBy({ email: dto.email });
    if (existing) throw new ConflictException("Email already exists");

    const role = await this.roleRepo.findOne({ where: { name: dto.role } });
    if (!role) throw new NotFoundException("Role not found");

    // Create a pending user
    const user = this.userRepo.create({
      email: dto.email,
      roleId: role._id,
      companyId: owner.companyId,
      isPending: true,
      isCompanyOwner: false,
    });

    await this.userRepo.save(user);

    // Add to company
    await this.companyRepo.updateOne(
      { _id: owner.companyId },
      { $addToSet: { memberIds: user._id } as any }
    );

    // Create invite token
    const token = this.jwtService.sign({ _id: user._id }, { expiresIn: "2d" });

    const inviteLink = `https://your-app.com/accept-invite?token=${token}`;

    await this.mailService.sendGenericEmail(
      dto.email,
      "You’ve been invited to join LawFirm",
      `<p>Click the link to join:</p><a href="${inviteLink}">${inviteLink}</a>`
    );

    return { message: "Invite sent successfully" };
  }

  async acceptInvite(dto: AcceptInviteDto) {
    const decoded = await this.jwtService.verifyAsync(dto.token);
    const userId = decoded._id;

    const user = await this.userRepo.findOneBy({ _id: new ObjectId(userId) });
    if (!user || !user.isPending) throw new NotFoundException("Invalid invite");

    user.name = dto.name;
    user.password = await hash(dto.password, 10);
    user.isPending = false;

    await this.userRepo.save(user);

    return { message: "Account activated successfully" };
  }
}
