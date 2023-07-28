export interface LoginResponseDTO {
  expiredIn: number;
  token: string;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  username: string;
  password: string;
}

export interface UserDTO {
  username: string;
  name: string;
  avatar: string;
}
