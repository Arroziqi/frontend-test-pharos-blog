import axios from "axios";
import { API_CONFIG } from "@/lib/common/config/apiConfig";

export const jsonPlaceholderApi = axios.create({
  baseURL: API_CONFIG.JSON_PLACEHOLDER_API_URL.baseURL,
  timeout: 10000,
});
