/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoteCategory } from './entities/note-category.entity';
import { CreateNoteCategoryDto } from './dto/create-note-category.dto';
import { Note } from '../note/entities/note.entity';
import { Category } from '../category/entities/category.entity';
import { UpdateNoteCategoryDto } from './dto/update-note-category.dto';

@Injectable()
export class NoteCategoryService {
  constructor(
    @InjectRepository(NoteCategory)
    private readonly noteCategoryRepository: Repository<NoteCategory>,
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createNoteCategoryDto: CreateNoteCategoryDto): Promise<NoteCategory> {
    const { noteId, categoryId } = createNoteCategoryDto;
  
    // Validate that both noteId and categoryId are provided
    if (!noteId || !categoryId) {
      throw new BadRequestException('Note ID and Category ID must be provided');
    }
  
    // Verifica si la nota existe
    const note = await this.noteRepository.findOne({ where: { id: noteId } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${noteId} not found`);
    }
  
    // Verifica si la categoría existe
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
  
    // Verifica si ya existe la relación
    const existingRelation = await this.noteCategoryRepository.findOne({
      where: { note: { id: noteId }, category: { id: categoryId } },
      relations: ['note', 'category'],
    });
  
    if (existingRelation) {
      throw new Error(
        `Relation between Note ID ${noteId} and Category ID ${categoryId} already exists`,
      );
    }
  
    // Crea y guarda la relación
    const noteCategory = this.noteCategoryRepository.create({
      note,
      category,
    });
  
    return this.noteCategoryRepository.save(noteCategory);
  }

  async findAll(): Promise<NoteCategory[]> {
    return this.noteCategoryRepository.find({
      relations: ['note', 'category'],
    });
  }

  async findOne(id: number): Promise<NoteCategory> {
    const noteCategory = await this.noteCategoryRepository.findOne({
      where: { id },
      relations: ['note', 'category'],
    });

    if (!noteCategory) {
      throw new NotFoundException(`NoteCategory with ID ${id} not found`);
    }

    return noteCategory;
  }

  async update(
    id: number,
    updateNoteCategoryDto: UpdateNoteCategoryDto,
  ): Promise<NoteCategory> {
    const noteCategory = await this.findOne(id);
    Object.assign(noteCategory, updateNoteCategoryDto);
    return this.noteCategoryRepository.save(noteCategory);
  }

  async remove(id: number): Promise<void> {
    const result = await this.noteCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`NoteCategory with ID ${id} not found`);
    }
  }
}
