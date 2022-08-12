export interface IAppAutocompleteField {
  onChange: (value: string) => void;
  onPress: (value: string) => void;
  data: string[];
  value: string;
  placeholder?: string;
  isDisplay?: boolean;
  isLoading?: boolean;
  style?: Object;
}
