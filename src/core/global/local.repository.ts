import { EntityTable } from "dexie";
import { RepositoryInterface } from "./repository.interface";
import type { UuidGeneratorInterface } from "./services/interfaces/uuid-generator.interface";
import { inject, injectable } from "tsyringe"

@injectable()
export class LocalRepository<Model extends { id: string }, CreateDto, UpdateDto> implements RepositoryInterface<Model, CreateDto> {
  protected table: EntityTable<Model, 'id'>;
  constructor(@inject('UuidGenerator') private readonly uuidService: UuidGeneratorInterface) { }

  async create(data: CreateDto): Promise<string> {
    const id = await this.table.add({ id: this.uuidService.generate(), ...data });

    if (typeof id == 'string') {
      return id;
    }

    throw new Error('Failed to create product: ID was not returned as a string.');
  }

  async find(query: object): Promise<Model[]> {
    if (Object.keys(query).length === 0) {
      return await this.table.toArray();
    }

    return await this.table.where(query).toArray();
  }

  async delete(id: string): Promise<void> {
    await this.table.where({id}).delete();
  }
}