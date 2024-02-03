export type OrganizationUserActionKey =
  | OrganizationUserActionKeyEnum.Settings
  | OrganizationUserActionKeyEnum.Edit
  | OrganizationUserActionKeyEnum.Other;

export enum OrganizationUserActionKeyEnum {
  Settings = "settings",
  Edit = "edit",
  Other = "other",
}
