import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  // Endpoint para crear una nueva nota
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  // Endpoint para buscar todas las notas con filtrado opcional basado en parámetros de consulta
  @Get()
  async findAll(@Query() query: any) {
    const notes = await this.noteService.findAll(query);
    if (notes.length === 0) {
      throw new NotFoundException('No notes found or they have been removed');
    }
    return notes;
  }

  // Endpoint para encontrar una nota por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const note = await this.noteService.findOne(+id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  // Endpoint para actualizar una nota
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  // Endpoint para eliminar una nota
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}
