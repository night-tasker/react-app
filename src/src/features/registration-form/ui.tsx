import { Button } from "antd";
import AuthService from "shared/services/auth-service";
import { RegisterUser } from "./config/models/register-user";
import {
  handleFailedRequest,
  handleSuccessRequest,
} from "shared/api/base/api-instance";
import ReplaceLink from "shared/components/replace-link/ui";
import { RoutePaths } from "app/routing/route-paths";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "shared/components/form/ui";
import getRegistrationFields from "./lib/registration-fields";

interface Props {
  key?: string;
}

const RegistrationForm = ({ key }: Props) => {
  const navigate = useNavigate();

  const onFinish = (values: RegisterUser) => {
    AuthService.register(values)
      .then((response) => {
        handleSuccessRequest(response);
        navigate(RoutePaths.Global.Login);
        return response.data;
      })
      .catch((error) => {
        handleFailedRequest(error);
      });
  };

  return (
    <ApplicationForm<RegisterUser>
      title="Регистрация"
      onFinish={onFinish}
      submitButton={
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      }
      cancelButton={
        <ReplaceLink path={RoutePaths.Global.Login} title="Войти в систему" />
      }
      fields={getRegistrationFields()}
      key={key}
    />
  );
};

export default RegistrationForm;
