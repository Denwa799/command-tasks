export interface IDropdown {
  dangerText: string;
  placeholder: string;
  autocompletePress: string;
  isDanger: boolean;
  items?: {
    id: number;
    title: string;
    text?: string;
  }[];
  setAutocompletePress: (value: string) => void;
}
