export interface IAppDatePicker {
  title?: string;
  isOpen: boolean;
  date: Date;
  onCancel: () => void;
  onConfirm: (date: Date) => void;
}
