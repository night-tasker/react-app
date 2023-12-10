import { Button, Form, Input, Typography } from "antd";
import { styled } from "styled-components";
import AuthService from "../../../../services/auth-service";
import { RegisterUser } from "../../../../types/user/register-user";
import {
  handleFailedRequest,
  handleSuccessRequest,
} from "../../../../services/api-instance";
import ReplaceLink from "../../../../components/routing/replace-link";
import { RoutePaths } from "../../../../routing/route-paths";

const RegistrationForm = () => {
  const onFinish = (values: RegisterUser) => {
    AuthService.register(values)
      .then((response) => {
        handleSuccessRequest(response);
      })
      .catch((error) => {
        handleFailedRequest(error);
      });
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Typography.Title level={3}>Регистрация</Typography.Title>
      </TitleWrapper>
      <StyledForm
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<RegisterUser>
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: "Имя пользователя обязательно" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<RegisterUser>
          label="Пароль"
          labelCol={{ md: { flex: "none" } }}
          name="password"
          rules={[{ required: true, message: "Пароль обязателен" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<RegisterUser>
          name="confirmPassword"
          label="Подтвердите пароль"
          rules={[{ required: true, message: "Пароль обязателен" }]}
        >
          <Input.Password />
        </Form.Item>

        <ButtonWrapper>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
          </Form.Item>
        </ButtonWrapper>

        <LoginLinkWrapper>
          <ReplaceLink path={RoutePaths.Global.Login} title="Войти в систему" />
        </LoginLinkWrapper>
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

const LoginLinkWrapper = styled.div`
  text-align: center;
`;

export default RegistrationForm;
