import { ChangePasswordRequest } from "../../data/user.request";
import { User } from "../entities/user.entity";

export interface UserRepository {
  updateProfile(user: User): Promise<boolean>;
  changePassword(request: ChangePasswordRequest): Promise<boolean>;
}
