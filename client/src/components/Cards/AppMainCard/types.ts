import {TaskStatusType} from 'models/ITasks';
import {IUser} from 'models/IUser';

export interface IAppMainCard {
  id: number;
  creatorId?: number;
  text: string;
  isColors?: boolean;
  isUrgently?: boolean;
  isAdditionalButtons?: boolean;
  date?: Date;
  status?: TaskStatusType;
  responsible?: IUser;
  style?: Object;
  item: any;
  onOpen?: (id: number, creatorId: number) => void;
  onDialog?: (id: number, actualStatus: TaskStatusType | '') => void;
  onChange?: (
    id: number,
    text: string,
    responsibleEmail: string | undefined,
    status: TaskStatusType | undefined,
    isUrgently: boolean | undefined,
    date: Date | undefined,
  ) => void;
}
