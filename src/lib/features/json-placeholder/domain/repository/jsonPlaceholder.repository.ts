import { JsonPlaceholderEntity } from "@/lib/features/json-placeholder/domain/entity/jsonPlaceholder.entity";

export interface JsonPlaceholderRepository {
  getAll(
    limit?: number,
    signal?: AbortSignal,
  ): Promise<JsonPlaceholderEntity[]>;
}
