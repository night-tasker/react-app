import { message } from "antd";

const showErrorMessage = (errorMessage: string) => {
  message.error(errorMessage);
};

const showSuccessMessage = (successMessage: string) => {
  message.success(successMessage);
};

export const AlertMessageService = {
  showErrorMessage,
  showSuccessMessage,
};
