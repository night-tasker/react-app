import { Avatar, Spin } from "antd";
import useCurrentUserActiveImage from "entities/user-image/model/current-user-active-image";
import { useEffect } from "react";

const CurrentUserMenuImage = () => {
  const [
    { data: currentUserImage, loading: currentUserImageLoading },
    fetchCurrentUserImage,
  ] = useCurrentUserActiveImage();

  useEffect(() => {
    fetchCurrentUserImage();
  }, [fetchCurrentUserImage]);

  return currentUserImageLoading ? (
    <Spin />
  ) : currentUserImage?.url ? (
    <Avatar size={56} src={`${currentUserImage?.url}`} />
  ) : null;
};

export default CurrentUserMenuImage;
