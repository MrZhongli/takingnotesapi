import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteCategoryService } from './note-category.service';
import { NoteCategoryController } from './note-category.controller';
import { NoteCategory } from './entities/note-category.entity';
import { Note } from 'src/note/entities/note.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoteCategory, Note, Category])],
  controllers: [NoteCategoryController],
  providers: [NoteCategoryService],
  exports: [NoteCategoryService],
})
export class NoteCategoryModule {}
