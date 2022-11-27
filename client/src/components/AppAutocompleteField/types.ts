export interface IAppAutocompleteField {
  value: string;
  placeholder?: string;
  dangerText?: string;
  data: string[];
  isDisplay?: boolean;
  isLoading?: boolean;
  isDanger?: boolean;
  style?: Object;
  onChange: (value: string) => void;
  onPress: (value: string) => void;
}
