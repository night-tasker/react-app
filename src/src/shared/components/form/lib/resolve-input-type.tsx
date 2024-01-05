import { Input } from "antd";
import { InputType } from "zlib";

const ResolveInputTypes = (type?: InputType, disabled?: boolean) => {
  switch (type) {
    case "password":
      return <Input.Password disabled={disabled} />;
    default:
      return <Input disabled={disabled} />;
  }
};

export default ResolveInputTypes;
