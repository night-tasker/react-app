import { Avatar, Skeleton, Spin } from "antd";
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

  return (
    <Skeleton loading={currentUserImageLoading} active avatar={true}>
      {currentUserImage?.url ? (
        <Avatar size={56} src={`${currentUserImage?.url}`} />
      ) : null}
    </Skeleton>
  );
};

export default CurrentUserMenuImage;
