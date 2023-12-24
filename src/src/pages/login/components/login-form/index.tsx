import { Button } from "antd";
import AuthService from "../../../../services/auth-service";
import {
  handleFailedRequest,
  handleSuccessRequest,
} from "../../../../services/api-instance";
import { LoginUser } from "../../../../types/user/login-user";
import { RoutePaths } from "../../../../routing/route-paths";
import { useNavigate } from "react-router-dom";
import ReplaceLink from "../../../../components/routing/replace-link";
import ApplicationForm from "../../../../components/form";
import getLoginFields from "../../lib/get-login-fields";

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
