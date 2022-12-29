import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, Min } from 'class-validator'

export enum FilterUserSort {
  CreatedAt = 'created_at',
}

export class FilterUsersParams {
  email?: string
  name?: string
  country?: string

  // @Transform(({ value }) => Number(value))
  // @Min(0)
  age?: number
  limit?: number
  offset?: number

  @IsEnum(FilterUserSort)
  @IsOptional()
  sort?: FilterUserSort
}
