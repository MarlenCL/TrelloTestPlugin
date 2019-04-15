export class Board {
  boardId: string;
  name: string;
  lists?: [
  {
    id: string,
    name: string
    }
  ];
  organization?: {
    displayName: string;
    id: string;
  };
}
