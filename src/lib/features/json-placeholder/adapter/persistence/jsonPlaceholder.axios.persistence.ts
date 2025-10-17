import { JsonPlaceholderRepository } from "@/lib/features/json-placeholder/domain/repository/jsonPlaceholder.repository";
import { JsonPlaceholderEntity } from "../../domain/entity/jsonPlaceholder.entity";
import { jsonPlaceholderApi } from "@/lib/common/api/api";
import { API_CONFIG } from "@/lib/common/config/apiConfig";
import axios from "axios";

export class JsonPlaceholderAxiosPersistence
  implements JsonPlaceholderRepository
{
  /**
   * Mengambil semua data posts dari JSONPlaceholder API.
   * @param limit - Jumlah maksimum data yang ingin diambil.
   * @param signal - Optional AbortSignal untuk membatalkan request.
   */
  async getAll(
    limit: number = 11,
    signal?: AbortSignal,
  ): Promise<JsonPlaceholderEntity[]> {
    try {
      const response = await jsonPlaceholderApi.get<JsonPlaceholderEntity[]>(
        API_CONFIG.JSON_PLACEHOLDER_API_URL.posts,
        { signal },
      );

      return response.data.slice(0, limit);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.debug("Request dibatalkan oleh AbortController");
        return [];
      }

      if (error instanceof Error && error.name === "CanceledError") {
        console.debug("Request dibatalkan oleh AbortController");
        return [];
      }

      throw error;
    }
  }
}
