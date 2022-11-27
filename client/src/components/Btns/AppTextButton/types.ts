export interface IAppTextButton {
  numberOfLines?: number;
  children: string | string[];
  isTextCenter?: boolean;
  isDisabled?: boolean;
  style?: Object;
  containerStyle?: Object;
  onPress: () => void;
}
