import { Button, Modal } from "antd";
import OrganizationForm from "features/organization/organization-form/ui";
import { useEffect, useState } from "react";
import { Organization } from "shared/api/typicode/models/organization";
import styled from "styled-components";

interface Props {
  values: Organization;
  isOpen?: boolean;
  openButtonInner?: React.ReactElement;
  openButtonStyles?: React.CSSProperties;
  onSave: (values: Organization) => Promise<void>;
}
const OrganizationModalForm = ({
  values,
  isOpen,
  openButtonInner,
  openButtonStyles,
  onSave,
}: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen ?? false);
  const [formValues, setFormValues] = useState(values);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormValues({ ...values });
  };

  const onSaveForm = (values: Organization) => {
    onSave(values).then(() => {
      closeModal();
    });
  };

  useEffect(() => {
    setFormValues({ ...values });
  }, [values]);

  return (
    <>
      <Button onClick={openModal} style={openButtonStyles}>
        {openButtonInner}
      </Button>
      <StyledModal
        open={modalIsOpen}
        onCancel={closeModal}
        title={<ModalTitleWrapper>Новая организация</ModalTitleWrapper>}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <OrganizationForm
          onSaveOrganization={onSaveForm}
          cancelButton={<Button onClick={closeModal}>Отменить</Button>}
          saveButton={
            <Button type="primary" htmlType="submit">
              Сохранить
            </Button>
          }
          values={formValues}
        />
      </StyledModal>
    </>
  );
};

const ModalTitleWrapper = styled.div`
  text-align: center;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding-bottom: 0px;
  }
`;

export default OrganizationModalForm;
