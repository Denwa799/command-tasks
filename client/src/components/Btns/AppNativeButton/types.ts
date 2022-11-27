export interface IAppNativeButton {
  title: string;
  disabled?: boolean;
  styleContainer?: Object;
  onPress: () => void;
}
