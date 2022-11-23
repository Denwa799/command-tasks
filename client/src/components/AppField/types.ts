export interface IAppField {
  value: string;
  placeholder: string;
  successText?: string;
  warningText?: string;
  dangerText?: string;
  keyboardType?: keyboardType;
  isSecure?: boolean;
  isSuccess?: boolean;
  isWarning?: boolean;
  isDanger?: boolean;
  style?: Object;
  onChange: (value: string) => void;
}

type keyboardType =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'url';
