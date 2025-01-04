export interface RepositoryInterface<Model, CreateDto> {
  create(data: CreateDto): Promise<string>;
  find(query: object): Promise<Model[]>;
  // findById(id: string): Promise<T | null>;
  // update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<void>;
}