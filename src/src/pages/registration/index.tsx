import { styled } from "styled-components";
import RegistrationForm from "./components/registration-form";
import { Card } from "antd";

const RegistrationPage = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <Card>
          <RegistrationForm key="registration" />
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

export default RegistrationPage;
