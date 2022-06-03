import { HttpClient } from "../lib/http";
import { authService } from "./auth.service"

const baseUrl = import.meta.env.VITE_BASE_API_URL || ""

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
