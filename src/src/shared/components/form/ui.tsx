import { Form, Typography } from "antd";
import { styled } from "styled-components";
import React, { useEffect } from "react";
import { Field } from "./types/field";
import ResolveInputTypes from "shared/components/form/lib/resolve-input-type";

interface Props<T> {
  title?: string;
  onFinish: (values: T) => void;
  submitButton: React.ReactElement;
  cancelButton: React.ReactElement;
  fields: Field[];
  values?: T;
  key?: string;
}
const ApplicationForm = <T extends {}>({
  title,
  onFinish,
  submitButton,
  cancelButton,
  fields,
  values,
  key,
}: Props<T>) => {
  const [form] = Form.useForm<T>();

  const resetValues = () => {
    form.setFieldsValue(values as any);
  };

  useEffect(() => {
    form.setFieldsValue(values as any);
  }, [form, values]);

  return (
    <Wrapper>
      <TitleWrapper>
        {title && (
          <Typography.Title level={3} key={key}>
            {title}
          </Typography.Title>
        )}
      </TitleWrapper>
      <StyledForm<T>
        name="basic"
        initialValues={{ remember: false }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        {fields.map(({ name, label, rules, type, disabled }) => {
          return (
            <Form.Item label={label} name={name} rules={rules} key={name}>
              {ResolveInputTypes(type, disabled)}
            </Form.Item>
          );
        })}

        <ButtonsWrapper>
          <ButtonWrapper>
            <Form.Item>{submitButton}</Form.Item>
          </ButtonWrapper>

          <ButtonWrapper onClick={resetValues}>{cancelButton}</ButtonWrapper>
        </ButtonsWrapper>
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
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  width: 70%;
  margin: auto;
`;
