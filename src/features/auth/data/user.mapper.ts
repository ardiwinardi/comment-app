import { User } from "../domain/entities/user.entity";
import { UserDTO } from "./dtos/auth.dto";

export default function mapUserDTOToEntity(dto: UserDTO): User {
  return {
    name: dto.name ?? "",
    username: dto.username ?? "",
    avatar: dto.avatar ?? "",
  };
}
