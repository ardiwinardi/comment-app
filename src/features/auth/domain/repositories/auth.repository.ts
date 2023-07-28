import { LoginRequest, RegisterRequest } from "../../data/auth.request";
import { User } from "../entities/user.entity";

export interface AuthRepository {
  login(request: LoginRequest): Promise<void>;
  register(request: RegisterRequest): Promise<void>;
  getMe(): Promise<User>;
}
