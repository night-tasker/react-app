export type Organization = {
  id: string;
  name: string;
  description?: string;
};

export type CreateOrganizationDto = {
  name: string;
  description?: string;
};
