import { UploadFile } from "antd";

export type ActiveUserImage = {
  url: string;
};

export type UserImage = {
  url: string;
  id: string;
  isActive: boolean;
};

export type UploadFileImage = UploadFile & {
  isActive: boolean;
};
