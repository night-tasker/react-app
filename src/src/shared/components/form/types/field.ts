import { Rule } from "antd/es/form";

export type Field = {
  name: string;
  label: string;
  rules: Rule[];
  type?: string;
};
