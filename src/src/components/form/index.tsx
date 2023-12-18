import { Form, Typography } from "antd";
import { styled } from "styled-components";
import React from "react";
import { Field } from "./types/field";
import ResolveInputTypes from "./lib/resolve-input-type";

interface Props<T> {
  title: string;
  onFinish: (values: T) => void;
  submitButton: React.ReactElement;
  cancelButton: React.ReactElement;
  fields: Field[];
}
const ApplicationForm = <T extends {}>({
  title,
  onFinish,
  submitButton,
  cancelButton,
  fields,
}: Props<T>) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Typography.Title level={3}>{title}</Typography.Title>
      </TitleWrapper>
      <StyledForm<T>
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        {fields.map(({ name, label, rules, type }) => {
          return (
            <Form.Item label={label} name={name} rules={rules}>
              {ResolveInputTypes(type)}
            </Form.Item>
          );
        })}

        <ButtonWrapper>
          <Form.Item>{submitButton}</Form.Item>
        </ButtonWrapper>

        <RegisterLinkWrapper>{cancelButton}</RegisterLinkWrapper>
      </StyledForm>
    </Wrapper>
  );
};

export default ApplicationForm;

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
