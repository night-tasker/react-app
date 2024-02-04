import { AxiosPromise } from "axios";
import apiInstance from "shared/api/base/api-instance";
import {
  CreateOrganizationDto,
  Organization,
  OrganizationUserRole,
  UpdateOrganizationDto,
} from "shared/api/typicode/models/organization";
import { SearchCriteria } from "shared/api/typicode/search/search-criteria";
import { SearchResult } from "shared/api/typicode/search/search-result";
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

const searchOrganizations = (
  searchCriteria: SearchCriteria
): AxiosPromise<SearchResult<Organization>> => {
  return apiInstance.post(`${API_ORGANIZATIONS_URL}/search`, searchCriteria);
};

const createOrganization = (
  organization: CreateOrganizationDto
): AxiosPromise<string> => {
  return apiInstance.post(`${API_ORGANIZATIONS_URL}`, organization);
};

const updateOrganization = (
  organizationId: string,
  organization: UpdateOrganizationDto
): AxiosPromise => {
  return apiInstance.put(
    `${API_ORGANIZATIONS_URL}/${organizationId}`,
    organization
  );
};

const removeOrganization = (organizationId: string): AxiosPromise => {
  return apiInstance.delete(`${API_ORGANIZATIONS_URL}/${organizationId}`);
};

const OrganizationService = {
  getOrganizationById,
  getOrganizations,
  getOrganizationUserRole,
  searchOrganizations,
  createOrganization,
  updateOrganization,
  removeOrganization,
};

export default OrganizationService;
