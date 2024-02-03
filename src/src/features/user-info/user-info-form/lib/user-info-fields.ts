import { Field } from "shared/components/form/types/field";

export const getUserInfoFields = (): Field[] => {
  return [
    {
      name: "userName",
      label: "Имя пользователя",
      disabled: true,
    },
    {
      name: "email",
      label: "Почта",
      disabled: true,
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
