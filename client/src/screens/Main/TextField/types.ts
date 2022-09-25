export interface ITextField {
  textValue: string;
  placeholder: string;
  dangerText: string;
  isDanger: boolean;
  setText: (value: string) => void;
  setIsTextError: (value: boolean) => void;
}
