import { Field } from "shared/components/form/types/field";

export const getCurrentUserInfoFields = (): Field[] => {
  return [
    {
      name: "userName",
      label: "Имя пользователя",
      disabled: true,
    },
    {
      name: "email",
      label: "Почта",
    },
    {
      name: "firstName",
      label: "Имя",
    },
    {
      name: "middleName",
      label: "Отчество",
    },
    {
      name: "lastName",
      label: "Фамилия",
    },
  ];
};
