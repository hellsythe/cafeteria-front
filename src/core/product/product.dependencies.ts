import { container } from "tsyringe"
import { ProductRepository } from "./product.repository"
import { UuidGenerator } from "../global/services/uuid-generator"
import { ProductRemoteRepository } from "./product-remote.repository"

container.register("UuidGenerator", {useClass: UuidGenerator})
container.register("ProductRepository", { useClass: ProductRepository})
container.register("ProductRemoteRepository", { useClass: ProductRemoteRepository})


export { container }