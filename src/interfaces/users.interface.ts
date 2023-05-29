import { z } from "zod"
import { userSchema, returnUserSchema, returnMultipleUsersSchema } from "../schemas/users.schema"
import { User } from "../entities/user.entity"
import { DeepPartial, Repository } from "typeorm"

type iUser = z.infer<typeof userSchema>
type iUserReturn = z.infer<typeof returnUserSchema>
type iUserRepo = Repository<User>
type iUsersReturn = z.infer<typeof returnMultipleUsersSchema>
type iUserUpdate = DeepPartial<iUser>

export { iUser, iUserReturn, iUserRepo, iUsersReturn, iUserUpdate }
