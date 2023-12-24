import { Field } from "../../../components/form/types/field";

const getRegistrationFields = (): Field[] => {
  return [
    {
      name: "username",
      label: "Имя пользователя",
      rules: [{ required: true, message: "Имя пользователя обязательно" }],
    },
    {
      name: "password",
      label: "Пароль",
      rules: [{ required: true, message: "Пароль обязателен" }],
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "Подтвердите пароль",
      rules: [{ required: true, message: "Пароль обязателен" }],
      type: "password",
    },
  ];
};

export default getRegistrationFields;
