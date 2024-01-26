import { AxiosPromise } from "axios";
import apiInstance from "shared/api/base/api-instance";
import {
  CreateOrganizationDto,
  Organization,
  OrganizationUserRole,
} from "shared/api/typicode/models/organization";
import { API_ORGANIZATIONS_URL } from "shared/config/paths";

const getOrganizationById = (id: string): AxiosPromise<Organization> => {
  return apiInstance.get(`${API_ORGANIZATIONS_URL}/${id}`);
};

const getOrganizations = (): AxiosPromise<Organization[]> => {
  return apiInstance.get(`${API_ORGANIZATIONS_URL}`);
};

const getOrganizationUserRole = (
  id: string
): AxiosPromise<{ role: OrganizationUserRole }> => {
  return apiInstance.get(`${API_ORGANIZATIONS_URL}/${id}/role`);
};

const createOrganization = (
  organization: CreateOrganizationDto
): AxiosPromise<string> => {
  return apiInstance.post(`${API_ORGANIZATIONS_URL}`, organization);
};

const OrganizationService = {
  getOrganizationById,
  getOrganizations,
  getOrganizationUserRole,
  createOrganization,
};

export default OrganizationService;
