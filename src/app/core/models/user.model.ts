export class UserResponse {
  success: boolean;
  user: User;
}

export class User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: number;
  photo: string;
  registration_timestamp?: number;
}
