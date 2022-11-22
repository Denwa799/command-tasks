export interface IAppField {
  value: string;
  placeholder: string;
  successText?: string;
  warningText?: string;
  dangerText?: string;
  isSecure?: boolean;
  isSuccess?: boolean;
  isWarning?: boolean;
  isDanger?: boolean;
  style?: Object;
  onChange: (value: string) => void;
}
