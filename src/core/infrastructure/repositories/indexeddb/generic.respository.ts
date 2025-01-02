import { RepositoryInterface } from "../../../global/repository.interface";

export class GenericRepository<T extends { id: string }> implements RepositoryInterface<T> {
  private data: T[];

  constructor() {
    this.data = [];
  }

  async create(data: T): Promise<string> {
    this.data.push(data);
    return data.id;
  }

  async findAll(): Promise<T[]> {
    return this.data;
  }

  async findById(id: string): Promise<T | null> {
    const foundItem = this.data.find((item) => item.id === id);
    return foundItem !== undefined ? foundItem : null;
  }

  async update(id: string, data: T): Promise<T> {
    const index = this.data.findIndex((item) => item.id === id);
    this.data[index] = data;
    return data;
  }

  async delete(id: string): Promise<void> {
    const index = this.data.findIndex((item) => item.id === id);
    this.data.splice(index, 1);
  }
}