export interface RepositoryInterface<T> {
  create(data: T): Promise<string>;
  // findAll(): Promise<T[]>;
  // findById(id: string): Promise<T | null>;
  // update(id: string, data: T): Promise<T>;
  // delete(id: string): Promise<void>;
}