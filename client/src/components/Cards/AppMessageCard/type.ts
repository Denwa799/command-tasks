export interface IAppMessageCard {
  id: number;
  message: string;
  btnText?: string;
  secondBtnText?: string;
  isAccepted: boolean;
  disabled?: boolean;
  onPress?: (id: number) => void;
  onSecondPress?: (id: number) => void;
}
