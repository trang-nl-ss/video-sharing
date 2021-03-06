import { HttpClient } from "../lib/http";
import { authService } from "./auth.service";

export interface BaseResponse<T> {
  title: string;
  data: T;
}

const baseUrl = "http://localhost:9000/api"

export const BaseHttpClient = new HttpClient({
  baseUrl,
  requestInterceptors: [
    (request) => {
      (
        request.headers as Record<string, string>
      ).Authorization = `Bearer ${authService.getToken()}`;
    },
  ],
});
