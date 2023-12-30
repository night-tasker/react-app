import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
  path: string;
  title: string;
}

const ReplaceLink = ({ path, title }: Props) => {
  const navigate = useNavigate();

  const onReplace = () => {
    navigate(path);
  };

  return <Typography.Link onClick={onReplace}>{title}</Typography.Link>;
};

export default ReplaceLink;
