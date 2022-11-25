export interface IAppDropdown {
  placeholder?: string;
  color?: string;
  dangerText?: string;
  isOpen: boolean;
  isDanger?: boolean;
  style?: Object;
  items: {
    id: number;
    title: string;
    text?: string;
  }[];
  onPress: () => void;
  setIsOpen: (value: boolean) => void;
  onItemClick: (id: number, name: string, email: string) => void;
}
