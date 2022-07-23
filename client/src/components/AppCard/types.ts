export interface IAppCard {
  id: number;
  text: string;
  status?: 'notCompleted' | 'inProgress' | 'done';
  responsible?: string;
  item: any;
  onOpen?: (item: any) => void;
  onDelete?: (id: number) => void;
  onChange?: (id: number, name: string) => void;
}
