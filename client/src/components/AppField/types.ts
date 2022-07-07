export interface IAppField {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  isSecure?: boolean;
  isDanger?: boolean;
  dangerText?: string;
}
