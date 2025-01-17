import { Note } from 'src/note/entities/note.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn() // Ensuring the ID is UUID if required
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relation to Note entity: One user can have many notes
    @OneToMany(() => Note, (note) => note.user)
    notes: Note[];
}
