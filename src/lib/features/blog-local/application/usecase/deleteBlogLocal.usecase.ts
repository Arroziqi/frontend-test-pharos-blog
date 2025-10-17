import { BlogLocalRepository } from "../../domain/repository/blogLocal.repository";

export class DeleteBlogLocalUseCase {
  constructor(private readonly repo: BlogLocalRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.repo.delete(id);
  }
}
