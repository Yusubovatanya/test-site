export class PositionSResponse {
  success : boolean;
  positions: Position[];
}

export class Position {
  id: number;
  name: string;
  isActiveOption?: boolean;
}
