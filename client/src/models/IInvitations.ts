export interface IInvitations {
  id: number;
  message: string;
  isAccepted: boolean;
  isRead: boolean;
  team?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
}
