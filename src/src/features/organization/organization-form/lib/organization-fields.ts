import { Field } from "shared/components/form/types/field";

const getOrganizationFields = (): Field[] => {
  return [
    {
      name: "name",
      label: "Название",
      rules: [{ required: true, message: "Имя организации обязательно" }],
    },
    {
      name: "description",
      label: "Описание",
    },
  ];
};

export default getOrganizationFields;
