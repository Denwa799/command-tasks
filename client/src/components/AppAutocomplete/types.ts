export interface IAppAutocomplete {
  onChange: (value: string) => void;
  onPress: (value: string) => void;
  data: string[];
  value: string;
  placeholder?: string;
  isDisplay?: boolean;
  isLoading?: boolean;
}
