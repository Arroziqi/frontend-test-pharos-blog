import { BlogLocalRepository } from "../../domain/repository/blogLocal.repository";
import { BlogLocalEntity } from "../../domain/entity/blogLocal.entity";

export class CreateBlogLocalUseCase {
  constructor(private readonly repo: BlogLocalRepository) {}

  async execute(
    data: Omit<BlogLocalEntity, "id" | "createdAt">,
  ): Promise<BlogLocalEntity> {
    return await this.repo.create(data);
  }
}
