import { EntityTable } from "dexie";
import { RepositoryInterface } from "./repository.interface";
import type { UuidGeneratorInterface } from "./services/interfaces/uuid-generator.interface";
import { inject, injectable } from "tsyringe"

@injectable()
export class LocalRepository<Model extends { id: string }, CreateDto> implements RepositoryInterface<Model, CreateDto> {
  protected table: EntityTable<Model, 'id', CreateDto>;
  constructor(@inject('UuidGenerator') private readonly uuidService: UuidGeneratorInterface) { }

  async create(data: CreateDto): Promise<string> {
    const entity = { id: this.uuidService.generate(), ...data } as CreateDto;

    const id = await this.table.add(entity);

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