import { JsonPlaceholderRepository } from "@/lib/features/json-placeholder/domain/repository/jsonPlaceholder.repository";
import { JsonPlaceholderEntity } from "@/lib/features/json-placeholder/domain/entity/jsonPlaceholder.entity";

export class GetAllJsonPlaceholderUsecase {
  constructor(
    private readonly jsonPlaceholderRepo: JsonPlaceholderRepository,
  ) {}

  async execute(
    limit?: number,
    signal?: AbortSignal,
  ): Promise<JsonPlaceholderEntity[]> {
    return await this.jsonPlaceholderRepo.getAll(limit, signal);
  }
}
