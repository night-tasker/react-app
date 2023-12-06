import { styled } from "styled-components";
import { Card } from "antd";
import LoginForm from "./components/login-form";

const LoginPage = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <Card>
          <LoginForm />
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
