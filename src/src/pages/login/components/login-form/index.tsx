import { Button, Form, Input, Typography } from "antd";
import { styled } from "styled-components";
import AuthService from "../../../../services/auth-service";
import {
  handleFailedRequest,
  handleSuccessRequest,
} from "../../../../services/api-instance";
import { LoginUser } from "../../../../types/user/login-user";
import { RoutePaths } from "../../../../routing/route-paths";
import { useNavigate } from "react-router-dom";
import ReplaceLink from "../../../../components/routing/replace-link";

const LoginForm = () => {
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
    <Wrapper>
      <TitleWrapper>
        <Typography.Title level={3}>Вход в систему</Typography.Title>
      </TitleWrapper>
      <StyledForm
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<LoginUser>
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: "Имя пользователя обязательно" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<LoginUser>
          label="Пароль"
          labelCol={{ md: { flex: "none" } }}
          name="password"
          rules={[{ required: true, message: "Пароль обязателен" }]}
        >
          <Input.Password />
        </Form.Item>

        <ButtonWrapper>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </ButtonWrapper>

        <RegisterLinkWrapper>
          <ReplaceLink
            path={RoutePaths.Global.Registration}
            title="Зарегистрироваться"
          />
        </RegisterLinkWrapper>
      </StyledForm>
    </Wrapper>
  );
};

const StyledForm = styled(Form)`
  width: 100%;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const Wrapper = styled.div``;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const RegisterLinkWrapper = styled.div`
  text-align: center;
`;
export default LoginForm;
