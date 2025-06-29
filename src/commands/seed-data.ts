import { ActionType, HttpMethod } from "src/types";

export const PERMISSION_SEED = [
  {
    name: "Create Driver",
    code: "drivers:create",
    resource: "drivers",
    action: ActionType.CREATE,
    method: HttpMethod.POST,
    endpoint: "/api/drivers",
    description: "",
  },
  {
    name: "Get All Drivers",
    code: "drivers:read",
    resource: "drivers",
    action: ActionType.READ,
    method: HttpMethod.GET,
    endpoint: "/api/drivers",
    description: "",
  },
  {
    name: "Update Driver",
    code: "drivers:update",
    resource: "drivers",
    action: ActionType.UPDATE,
    method: HttpMethod.PATCH,
    endpoint: "/api/drivers/:id",
    description: "",
  },
  {
    name: "Delete Driver",
    code: "drivers:delete",
    resource: "drivers",
    action: ActionType.DELETE,
    method: HttpMethod.DELETE,
    endpoint: "/api/drivers/:id",
    description: "",
  },
  // Add more like expenses:create, documents:read etc.
];

export const ROLE_SEED = [
  {
    name: "Admin",
    description: "Full system access",
    permissionCodes: PERMISSION_SEED.map((p) => p.code), // All permissions
  },
  {
    name: "Fleet Manager",
    description: "Manage drivers and trucks only",
    permissionCodes: ["drivers:create", "drivers:read", "drivers:update"],
  },
  {
    name: "Viewer",
    description: "Read-only access",
    permissionCodes: ["drivers:read"],
  },
];
