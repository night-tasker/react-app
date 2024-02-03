import { OrganizationUserRoleConstants } from "shared/api/constants/organization-user-role";

export type Organization = {
  id: string;
  name: string;
  description?: string;
  usersCount: number;
};

export type OrganizationUserRole =
  | OrganizationUserRoleConstants.Admin
  | OrganizationUserRoleConstants.Member;

export type CreateOrganizationDto = {
  name: string;
  description?: string;
};

export type UpdateOrganizationDto = {
  name: string;
  description?: string;
};
