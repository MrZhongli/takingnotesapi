import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateNoteDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsBoolean()
    isArchived?: boolean; // Optional, default will be handled in the entity
}
