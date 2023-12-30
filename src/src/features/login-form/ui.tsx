import { Button } from "antd";
import AuthService from "shared/services/auth-service";
import {
  handleFailedRequest,
  handleSuccessRequest,
} from "shared/api/base/api-instance";
import { LoginUser } from "./config/models/login-user";
import { RoutePaths } from "app/routing/route-paths";
import { useNavigate } from "react-router-dom";
import ReplaceLink from "shared/components/replace-link/ui";
import ApplicationForm from "shared/components/form/ui";
import { getLoginFields } from "./lib";

interface Props {
  key?: string;
}

const LoginForm = ({ key }: Props) => {
  const navigate = useNavigate();

  const onFinish = (values: LoginUser) => {
    AuthService.login(values)
      .then((response) => {
        handleSuccessRequest(response);
        navigate(RoutePaths.Authenticated.Home);
      })
      .catch((error) => {
        handleFailedRequest(error);
      });
  };

  return (
    <ApplicationForm<LoginUser>
      title="Вход"
      onFinish={onFinish}
      submitButton={
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      }
      cancelButton={
        <ReplaceLink
          path={RoutePaths.Global.Registration}
          title="Зарегистрироваться"
        />
      }
      fields={getLoginFields()}
      key={key}
    />
  );
};

export default LoginForm;
