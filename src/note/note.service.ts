import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { ErrorHandler } from 'src/util/error.handler';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  // Método para crear una nueva nota
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      const newNote = this.noteRepository.create({
        ...createNoteDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return await this.noteRepository.save(newNote);
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }

  // Método para buscar todas las notas con filtrado opcional
  async findAll(query: any): Promise<Note[]> {
    try {
      const filterOptions: any = {};

      // Filtrado opcional basado en los parámetros de consulta
      if (query.title) {
        filterOptions.title = Like(`%${query.title}%`);
      }
      if (query.isArchived !== undefined) {
        filterOptions.isArchived = query.isArchived === 'true'; // Convertir a booleano
      }
      if (query.createdAt) {
        filterOptions.createdAt = query.createdAt;
      }
      if (query.updatedAt) {
        filterOptions.updatedAt = query.updatedAt;
      }

      return await this.noteRepository.find({
        where: filterOptions,
        relations: ['user'], // Si quieres incluir relaciones como 'user'
      });
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }

  // Método para encontrar una nota por ID
  async findOne(id: number): Promise<Note> {
    try {
      const note = await this.noteRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!note) {
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return note;
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }

  // Método para actualizar una nota
  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    try {
      const note = await this.findOne(id);
      const updatedNote = {
        ...note,
        ...updateNoteDto,
        updatedAt: new Date(),
      };
      return await this.noteRepository.save(updatedNote);
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }

  // Método para eliminar una nota
  async remove(id: number): Promise<void> {
    try {
      const note = await this.findOne(id);
      await this.noteRepository.remove(note);
    } catch (error) {
      ErrorHandler.handleServiceError(error);
    }
  }
}
