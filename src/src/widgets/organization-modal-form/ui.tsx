import { Button, Modal } from "antd";
import OrganizationForm from "features/organization-form/ui";
import { useState } from "react";
import {
  CreateOrganizationDto,
  Organization,
} from "shared/api/typicode/models/organization";
import { AlertMessageService } from "shared/services/alert-message-service";
import OrganizationService from "shared/services/organization-service";
import styled from "styled-components";

interface Props {
  onSaving: () => void;
  values: Organization;
}
const OrganizationModalForm = ({ onSaving, values }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formValues, setFormValues] = useState(values);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormValues({ ...values });
  };

  const onSaveOrganization = (organization: CreateOrganizationDto) => {
    OrganizationService.createOrganization(organization)
      .then(() => {
        closeModal();
        onSaving();
      })
      .catch(() => {
        AlertMessageService.showErrorMessage("Ошибка при создании организации");
      });
  };

  return (
    <>
      <Button onClick={openModal}>Создать организацию</Button>
      <StyledModal
        open={modalIsOpen}
        onCancel={closeModal}
        title={<ModalTitleWrapper>Новая организация</ModalTitleWrapper>}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <OrganizationForm
          onSaveOrganization={onSaveOrganization}
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
