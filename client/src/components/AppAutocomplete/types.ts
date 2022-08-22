export interface IAppAutocomplete {
  onChange: (value: string) => void;
  onPress: (value: string) => void;
  onAdd: () => void;
  data: string[];
  value: string;
  placeholder?: string;
  isDisplay?: boolean;
  isLoading?: boolean;
  isDanger?: boolean;
  dangerText?: string;
}
