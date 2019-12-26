export class MsgError {
  error: {
    success: boolean;
    message: string;
    fails?: {
      name?: [
        string
      ],
      email?: [
        string
      ],
      phone?: [
        string
      ],
      position_id?: [
        string
      ],
      photo?: [
        string
      ]
    }
  }
}