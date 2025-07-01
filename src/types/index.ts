export enum ActionType {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export enum PermissionCode {
  // Cases
  CASE_CREATE = "cases:create",
  CASE_READ = "cases:read",
  CASE_UPDATE = "cases:update",
  CASE_DELETE = "cases:delete",

  // Documents
  DOCUMENT_CREATE = "documents:create",
  DOCUMENT_READ = "documents:read",
  DOCUMENT_UPDATE = "documents:update",
  DOCUMENT_DELETE = "documents:delete",

  // Tasks
  TASK_CREATE = "tasks:create",
  TASK_READ = "tasks:read",
  TASK_UPDATE = "tasks:update",
  TASK_DELETE = "tasks:delete",

  // Calendar
  CALENDAR_CREATE = "calendar:create",
  CALENDAR_READ = "calendar:read",
  CALENDAR_UPDATE = "calendar:update",
  CALENDAR_DELETE = "calendar:delete",

  // Notes
  NOTE_CREATE = "notes:create",
  NOTE_READ = "notes:read",
  NOTE_UPDATE = "notes:update",
  NOTE_DELETE = "notes:delete",

  // Chat
  CHAT_READ = "chat:read",
  CHAT_CREATE = "chat:create",
  CHAT_DELETE = "chat:delete",
  CHAT_UPDATE = "chat:update",

  // Billing
  BILLING_CREATE = "billing:create",
  BILLING_READ = "billing:read",
  BILLING_UPDATE = "billing:update",
  BILLING_DELETE = "billing:delete",

  // Users
  USER_CREATE = "users:create",
  USER_READ = "users:read",
  USER_UPDATE = "users:update",
  USER_DELETE = "users:delete",
}

export enum RouteType {
  IS_PUBLIC = "IS_PUBLIC",
}

export enum CompanyType {
  LAW = "law",
  CLIENT = "client",
}

export enum RoleName {
  CLIENT = "Client",
  LAWYER = "Law Firm Admin",
  PARALEGAL = "Paralegal",
  SECRETARY = "Secretary",
  ADMIN = "Admin",
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
