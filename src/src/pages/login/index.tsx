import { styled } from "styled-components";
import { Card } from "antd";
import LoginForm from "features/login/login-form/ui";

const LoginPage = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <Card>
          <LoginForm key={"login"} />
        </Card>
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  width: 25%;
`;

export default LoginPage;
