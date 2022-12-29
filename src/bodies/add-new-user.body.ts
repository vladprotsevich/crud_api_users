import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator'

export class AddNewUserBody {
  id?: string

  @MinLength(5, {
    message: 'Title is too short',
  })
  name?: string

  @IsNumber()
  @IsNotEmpty()
  age?: number

  @IsNotEmpty()
  @IsEmail()
  email?: string

  // password: string

  @IsNotEmpty()
  country?: string
}
