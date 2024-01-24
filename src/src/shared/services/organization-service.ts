import apiInstance from "shared/api/base/api-instance";
import { CreateOrganizationDto } from "shared/api/typicode/models/organization";
import { API_ORGANIZATIONS_URL } from "shared/config/paths";

const getOrganizationById = (id: string) => {
  return apiInstance.get(`${API_ORGANIZATIONS_URL}/${id}`);
};

const getOrganizations = () => {
  return apiInstance.get(`${API_ORGANIZATIONS_URL}`);
};

const createOrganization = (organization: CreateOrganizationDto) => {
  return apiInstance.post(`${API_ORGANIZATIONS_URL}`, organization);
};

const OrganizationService = {
  getOrganizationById,
  getOrganizations,
  createOrganization,
};

export default OrganizationService;
