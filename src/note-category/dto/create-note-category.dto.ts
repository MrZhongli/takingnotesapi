import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNoteCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  noteId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
