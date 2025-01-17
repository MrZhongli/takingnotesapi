import { Category } from "src/category/entities/category.entity";
import { Note } from "src/note/entities/note.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";

@Entity("note_categories")
export class NoteCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Note, (note) => note.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "note_id" })
  note: Note;

  @ManyToOne(() => Category, (category) => category.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
