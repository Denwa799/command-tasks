export interface IDatePicker {
  selectedDate: string;
  isPickerOpen: boolean;
  date: Date;
  setIsPickerOpen: (value: boolean) => void;
  setDate: (value: Date) => void;
}
