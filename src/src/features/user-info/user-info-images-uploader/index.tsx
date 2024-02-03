import { PlusOutlined } from "@ant-design/icons";
import { Button, Spin, Upload, UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import useCurrentUserActiveImage from "entities/user-image/model/current-user-active-image";
import useCurrentUserImages from "entities/user-image/model/current-user-images";
import { useEffect } from "react";
import { UploadFileImage } from "shared/api/typicode/models/user-image";
import UserImageService from "shared/services/user-image-service";
import { styled } from "styled-components";

const UserInfoImagesUploader = () => {
  const [{ data: images, loading }, fetchImages] = useCurrentUserImages();
  const [, fetchActiveImage] = useCurrentUserActiveImage();

  const imageList = (images
    ?.sort((a, b) => (a.isActive ? 0 : 1) - (b.isActive ? 0 : 1))
    .map((image) => ({
      uid: image.id,
      name: image.id,
      status: "done",
      url: image.url,
      isActive: image.isActive,
    })) ?? []) as UploadFileImage[];

  const handleRemove = (file: UploadFile) => {
    UserImageService.removeCurrentUserImage(file.uid).then(() => {
      fetchImages();
      fetchActiveImage();
    });
  };

  const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
    if (info.file.status === "uploading") {
      UserImageService.uploadCurrentUserImage(
        info.file.originFileObj as File
      ).then(() => {
        fetchImages();
        fetchActiveImage();
      });
    }
  };

  const handleSetActive = (imageId: string) => {
    UserImageService.setActiveCurrentUserImage(imageId).then(() => {
      fetchImages();
      fetchActiveImage();
    });
  };

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const itemRender = (originNode: React.ReactElement, file: UploadFile) => {
    return (
      <>
        {originNode}
        {(file as UploadFileImage).isActive ? (
          <IsActiveImageWrapper>{"Активна"}</IsActiveImageWrapper>
        ) : (
          <IsActiveImageWrapper>
            <SetActiveButton
              type="link"
              onClick={() => handleSetActive(file.uid)}
            >
              {"Активировать"}
            </SetActiveButton>
          </IsActiveImageWrapper>
        )}
      </>
    );
  };

  return loading ? (
    <Spin />
  ) : (
    <ImageListWrapper>
      <Upload
        listType="picture-card"
        fileList={imageList}
        //   onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        openFileDialogOnClick={true}
        itemRender={itemRender}
      >
        {imageList.length < 4 ? (
          <UploadButton type="button">
            <PlusOutlined />
            <UploadButtonTextWrapper>Upload</UploadButtonTextWrapper>
          </UploadButton>
        ) : null}
      </Upload>
    </ImageListWrapper>
  );
};

export default UserInfoImagesUploader;

const UploadButton = styled.button`
  border: 0;
  background: none;
`;

const UploadButtonTextWrapper = styled.div`
  margin-top: 8px;
  cursor: pointer;
`;

const IsActiveImageWrapper = styled.div`
  color: green;
  text-align: center;
  width: 100%;
`;

const ImageListWrapper = styled.div`
  width: 100%;
  .ant-upload-wrapper {
    text-align: left;
  }
`;

const SetActiveButton = styled(Button)`
  width: 100%;
  padding: 0;
  margin: 0;
  height: 100%;
`;
