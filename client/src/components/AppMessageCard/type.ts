export interface IAppMessageCard {
  id: number;
  message: string;
  isAccepted: boolean;
  btnText?: string;
  secondBtnText?: string;
  onPress?: () => void;
}
