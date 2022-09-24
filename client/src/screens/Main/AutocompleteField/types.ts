export interface IAutocompleteField {
  userEmail: string;
  pressText: string;
  dangerText: string;
  emails: string[];
  data: string[];
  isOpen: boolean;
  error: boolean;
  setUserEmail: (value: string) => void;
  onPress: (value: string) => void;
  onDangerText: (value: string) => void;
  setEmails: (value: string[]) => void;
  onError: (value: boolean) => void;
}
