export interface IAppAutocomplete {
  value: string;
  placeholder?: string;
  dangerText?: string;
  data: string[];
  isDisplay?: boolean;
  isLoading?: boolean;
  isDanger?: boolean;
  onChange: (value: string) => void;
  onPress: (value: string) => void;
  onAdd: () => void;
}
