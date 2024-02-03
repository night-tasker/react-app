import { Organization } from "shared/api/typicode/models/organization";
import ApplicationForm from "shared/components/form/ui";
import getOrganizationFields from "./lib/organization-fields";

interface Props {
  values?: Organization;
  onSaveOrganization: (values: Organization) => void;
  saveButton: React.ReactElement;
  cancelButton: React.ReactElement;
}
const OrganizationForm = ({
  values,
  onSaveOrganization,
  saveButton,
  cancelButton,
}: Props) => {
  return (
    <ApplicationForm<Organization>
      onFinish={onSaveOrganization}
      submitButton={saveButton}
      cancelButton={cancelButton}
      fields={getOrganizationFields()}
      values={values ?? undefined}
    />
  );
};

export default OrganizationForm;
