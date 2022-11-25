export interface IAppNativeFeedbackBtn {
  text: string;
  color?: string;
  isBorderRadius?: boolean;
  isCenter?: boolean;
  isMainColor?: boolean;
  disabled?: boolean;
  style?: Object;
  textStyle?: Object;
  onPress: () => void;
}
