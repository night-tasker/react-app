const getLoginFields = () => {
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
  ];
};

export default getLoginFields;
