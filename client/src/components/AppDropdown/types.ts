export interface IAppDropdown {
  onPress: () => void;
  placeholder?: string;
  style?: Object;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  items: {
    id: number;
    title: string;
    text?: string;
  }[];
  onItemClick: (id: number, name: string, email: string) => void;
  color?: string;
  isDanger?: boolean;
  dangerText?: string;
}
