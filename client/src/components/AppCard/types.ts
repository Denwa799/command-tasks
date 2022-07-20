export interface IAppCard {
  id: string;
  text: string;
  status?: 'notCompleted' | 'inProgress' | 'done';
  responsible?: string;
  item: any;
  onOpen?: (item: any) => void;
  onDelete?: (id: string) => void;
  onChange?: (id: string, name: string) => void;
}
