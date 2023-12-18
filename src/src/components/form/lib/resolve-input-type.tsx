import { Input } from "antd";
import { InputType } from "zlib";

const ResolveInputTypes = (type?: InputType) => {
  switch (type) {
    case "password":
      return <Input.Password />;
    default:
      return <Input />;
  }
};

export default ResolveInputTypes;
