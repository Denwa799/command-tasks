export interface IAppNativeButton {
  title: string;
  styleContainer?: Object;
  onPress: () => void;
  disabled?: boolean;
}
