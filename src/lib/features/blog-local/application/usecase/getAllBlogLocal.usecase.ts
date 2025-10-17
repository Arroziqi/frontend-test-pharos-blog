import { BlogLocalRepository } from "../../domain/repository/blogLocal.repository";
import { BlogLocalEntity } from "../../domain/entity/blogLocal.entity";

export class GetAllBlogLocalUseCase {
  constructor(private readonly repo: BlogLocalRepository) {}

  async execute(): Promise<BlogLocalEntity[]> {
    return await this.repo.getAll();
  }
}
