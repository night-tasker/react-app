import { Avatar, Spin } from "antd";
import useCurrentUserImage from "entities/user-image/model/current-user-image";
import { useEffect } from "react";

const CurrentUserMenuImage = () => {
  const [
    { data: currentUserImage, loading: currentUserImageLoading },
    fetchCurrentUserImage,
  ] = useCurrentUserImage();

  useEffect(() => {
    fetchCurrentUserImage();
  }, [fetchCurrentUserImage]);

  return !currentUserImageLoading && currentUserImage ? (
    <Avatar size={56} src={`${currentUserImage?.url}`} />
  ) : (
    <Spin />
  );
};

export default CurrentUserMenuImage;
