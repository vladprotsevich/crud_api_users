import { IsNotEmpty, IsNumber } from 'class-validator'

export class NewUserBody {
  id?: string

  @IsNotEmpty()
  name?: string

  @IsNumber()
  @IsNotEmpty()
  age?: number

  @IsNotEmpty()
  email?: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  country?: string

  token?: string
  salt?: string
  refresh_token?: any
}
