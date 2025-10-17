import { BlogLocalRepository } from "../../domain/repository/blogLocal.repository";
import { BlogLocalEntity } from "../../domain/entity/blogLocal.entity";

export class UpdateBlogLocalUseCase {
  constructor(private readonly repo: BlogLocalRepository) {}

  async execute(
    id: string,
    data: Partial<Omit<BlogLocalEntity, "id" | "createdAt">>,
  ): Promise<BlogLocalEntity | null> {
    return await this.repo.update(id, data);
  }
}
