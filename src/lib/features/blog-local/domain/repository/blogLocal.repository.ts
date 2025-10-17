import { BlogLocalEntity } from "../entity/blogLocal.entity";

export interface BlogLocalRepository {
  getAll(): Promise<BlogLocalEntity[]>;
  getById(id: string): Promise<BlogLocalEntity | null>;
  create(
    data: Omit<BlogLocalEntity, "id" | "createdAt">,
  ): Promise<BlogLocalEntity>;
  update(
    id: string,
    data: Partial<Omit<BlogLocalEntity, "id" | "createdAt">>,
  ): Promise<BlogLocalEntity | null>;
  delete(id: string): Promise<boolean>;
  clear(): Promise<void>;
}
