import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'userName only accepts letters, numbers and underscores',
  })
  userName?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;
}
