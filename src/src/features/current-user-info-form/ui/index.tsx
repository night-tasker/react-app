import useCurrentUserInfo from "entities/user-info/model/current-user-info";
import { useCallback, useEffect } from "react";
import { CurrentUserInfo } from "shared/api/typicode/models/user-info";
import ApplicationForm from "shared/components/form/ui";
import { getCurrentUserInfoFields } from "../lib/user-info-fields";
import { Button, Spin } from "antd";
import UserInfoService from "shared/services/user-info-service";
import { handleFailedRequest, handleSuccessRequest } from "shared";
import { styled } from "styled-components";

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
      <ApplicationForm<CurrentUserInfo>
        title={"Профиль"}
        onFinish={onSaveUserInfo}
        submitButton={<Button htmlType={"submit"}>Сохранить</Button>}
        cancelButton={<Button>Отменить</Button>}
        fields={getCurrentUserInfoFields()}
        values={currentUserInfoData ?? undefined}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, currentUserInfoData]);

  return componentCallback();

  // return loading === true || !currentUserInfoData ? (
  //   <Spin />
  // ) : (
  //   <ApplicationForm<CurrentUserInfo>
  //     title={"Профиль"}
  //     onFinish={onSaveUserInfo}
  //     submitButton={<Button htmlType={"submit"}>Сохранить</Button>}
  //     cancelButton={<Button>Отменить</Button>}
  //     fields={getCurrentUserInfoFields()}
  //     values={currentUserInfoData ?? undefined}
  //   />
  // );
};

export default CurrentUserInfoForm;

const Wrapper = styled.div`
  text-align: center;
`;
