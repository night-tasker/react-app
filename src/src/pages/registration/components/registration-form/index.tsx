import { Button } from "antd";
import AuthService from "../../../../services/auth-service";
import { RegisterUser } from "../../../../types/user/register-user";
import {
  handleFailedRequest,
  handleSuccessRequest,
} from "../../../../services/api-instance";
import ReplaceLink from "../../../../components/routing/replace-link";
import { RoutePaths } from "../../../../routing/route-paths";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "../../../../components/form";
import getRegistrationFields from "../../lib/get-registration-fields";

const RegistrationForm = () => {
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
    />
  );
};

export default RegistrationForm;
