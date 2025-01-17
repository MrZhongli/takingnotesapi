import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from 'db/data-source';
import { NoteModule } from './note/note.module';
import { NoteCategoryModule } from './note-category/note-category.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DataSourceConfig,
      autoLoadEntities: true, // Ensure this line is inside the object
    }),
    UserModule,
    NoteModule,
    NoteCategoryModule,
    CategoryModule,
  ],
})
export class AppModule {}
