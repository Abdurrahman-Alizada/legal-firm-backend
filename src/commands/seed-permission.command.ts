import { Command, CommandRunner } from 'nest-commander';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Permission } from 'src/modules/permission/entities/permission.entity';
import { Role } from 'src/modules/role/entities/role.entity';

import { PERMISSION_SEED, ROLE_SEED } from './seed-data';

@Command({
  name: 'seed:permissions',
  description: 'Seed permissions and roles if not already present',
})
export class SeedPermissionsCommand extends CommandRunner {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,

    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log('⏳ Seeding permissions and roles...');

    // Insert permissions
    for (const perm of PERMISSION_SEED) {
      const exists = await this.permissionRepo.findOne({ where: { code: perm.code } });
      if (!exists) {
        await this.permissionRepo.save(perm);
        console.log(`✅ Added permission: ${perm.code}`);
      }
    }

    const allPermissions = await this.permissionRepo.find();

    // Insert roles
    for (const roleSeed of ROLE_SEED) {
      const exists = await this.roleRepo.findOne({ where: { name: roleSeed.name } });
      if (!exists) {
        const rolePermissions = allPermissions.filter(p =>
          roleSeed.permissionCodes.includes(p.code),
        );
        const newRole = this.roleRepo.create({
          name: roleSeed.name,
          description: roleSeed.description,
          permissionIds: rolePermissions.map(p => p.id.toString()),
        });
        await this.roleRepo.save(newRole);
        console.log(`✅ Added role: ${roleSeed.name}`);
      }
    }

    console.log('🎉 Seeding completed.');
  }
}
