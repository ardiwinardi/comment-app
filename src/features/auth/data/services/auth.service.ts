import api from "@src/shared/services/api.service";
import { User } from "../../domain/entities/user.entity";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { LoginRequest, RegisterRequest } from "../auth.request";
import {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  UserDTO,
} from "../dtos/auth.dto";

import { ResponseDTO } from "@src/shared/dtos/response.dto";
import storageService from "@src/shared/services/storage.service";
import mapUserDTOToEntity from "../user.mapper";

class AuthService implements AuthRepository {
  async login(request: LoginRequest): Promise<void> {
    const payload: LoginDTO = {
      username: request.username,
      password: request.password,
    };

    const response = await api.post<ResponseDTO<LoginResponseDTO>>(
      "/auth/login",
      payload
    );
    if (response?.data?.data?.token) {
      storageService.saveToken(response.data.data.token);
    }
  }

  async register(request: RegisterRequest): Promise<void> {
    const payload: RegisterDTO = {
      name: request.name,
      username: request.username,
      password: request.password,
    };
    return await api.post("/auth/register", payload);
  }

  async getMe(): Promise<User> {
    const response = await api.get<ResponseDTO<UserDTO>>("/auth/me");
    const { data } = response.data;
    return mapUserDTOToEntity(data);
  }
}

export const authService = Object.freeze(new AuthService());
