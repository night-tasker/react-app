import useCurrentUserInfo from "entities/user-info/model/current-user-info";
import { useCallback, useEffect } from "react";
import { CurrentUserInfo } from "shared/api/typicode/models/user-info";
import ApplicationForm from "shared/components/form/ui";
import { getCurrentUserInfoFields } from "../lib/user-info-fields";
import { Button, Spin, Typography } from "antd";
import UserInfoService from "shared/services/user-info-service";
import { handleFailedRequest, handleSuccessRequest } from "shared";
import { styled } from "styled-components";
import CurrentUserInfoImagesUploader from "features/current-user-info-images-uploader/ui";

const CurrentUserInfoForm = () => {
  const [{ data: currentUserInfoData, loading }, fetchCurrentUserInfo] =
    useCurrentUserInfo();

  useEffect(() => {
    fetchCurrentUserInfo();
  }, [fetchCurrentUserInfo]);

  const onSaveUserInfo = (values: CurrentUserInfo) => {
    UserInfoService.updateCurrentUserInfo(values)
      .then((response) => {
        handleSuccessRequest(response);
        fetchCurrentUserInfo();
      })
      .catch((response) => {
        handleFailedRequest(response);
      });
  };

  const componentCallback = useCallback(() => {
    if (loading === true) {
      return (
        <Wrapper>
          <Spin />;
        </Wrapper>
      );
    } else if (!currentUserInfoData) {
      return (
        <Wrapper>
          <h3>Произошла ошибка</h3>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <TitleWrapper>
          <Typography.Title level={3}>{"Профиль"}</Typography.Title>
        </TitleWrapper>
        <ImageTitleWrapper>
          <ImageTitle>{"Фотография (максимум 4 загруженных)"}</ImageTitle>
        </ImageTitleWrapper>
        <ImageUploaderWrapper>
          <CurrentUserInfoImagesUploader />
        </ImageUploaderWrapper>
        <ApplicationForm<CurrentUserInfo>
          onFinish={onSaveUserInfo}
          submitButton={<Button htmlType={"submit"}>Сохранить</Button>}
          cancelButton={<Button danger>Отменить</Button>}
          fields={getCurrentUserInfoFields()}
          values={currentUserInfoData ?? undefined}
        />
      </Wrapper>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, currentUserInfoData]);

  return componentCallback();
};

export default CurrentUserInfoForm;

const Wrapper = styled.div`
  width: 43%;
  margin: auto;
  text-align: center;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const ImageTitle = styled.p``;

const ImageTitleWrapper = styled.div`
  text-align: left;
`;

const ImageUploaderWrapper = styled.div`
  margin-bottom: 15px;
`;
