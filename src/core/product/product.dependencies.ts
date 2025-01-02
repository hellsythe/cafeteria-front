import { container } from "tsyringe"
import { ProductLocalRepository } from "./product-local.repository"
import { UuidGenerator } from "../global/services/uuid-generator"
import { ProductRemoteRepository } from "./product-remote.repository"
import { CreateProduct } from "./usecases/create-product"

container.register("UuidGenerator", {useClass: UuidGenerator})
container.register("ProductLocalRepository", { useClass: ProductLocalRepository})
container.register("ProductRemoteRepository", { useClass: ProductRemoteRepository})
container.register("CreateProduct", { useClass: CreateProduct})


export { container }