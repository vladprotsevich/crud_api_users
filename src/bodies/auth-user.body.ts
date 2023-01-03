import { IsNotEmpty } from 'class-validator'

export class AuthBody {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string
}
