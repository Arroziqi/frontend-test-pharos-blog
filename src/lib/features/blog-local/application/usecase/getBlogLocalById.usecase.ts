import { BlogLocalRepository } from "../../domain/repository/blogLocal.repository";
import { BlogLocalEntity } from "../../domain/entity/blogLocal.entity";

export class GetBlogLocalByIdUseCase {
  constructor(private readonly repo: BlogLocalRepository) {}

  async execute(id: string): Promise<BlogLocalEntity | null> {
    return await this.repo.getById(id);
  }
}
