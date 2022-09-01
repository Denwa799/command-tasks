export interface IAppUserCard {
  id: number;
  name: string;
  email: string;
  btnText: string;
  isActive?: boolean;
  isBtnVisible?: boolean;
  isCreator?: boolean;
  onPress: (id: number) => void;
  style?: Object;
}
