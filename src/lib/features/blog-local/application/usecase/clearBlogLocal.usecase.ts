import { BlogLocalRepository } from "../../domain/repository/blogLocal.repository";

export class ClearBlogLocalUseCase {
  constructor(private readonly repo: BlogLocalRepository) {}

  async execute(): Promise<void> {
    return await this.repo.clear();
  }
}
