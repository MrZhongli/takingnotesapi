import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const isCompiled = __dirname.includes('dist');

export const DataSourceConfig: DataSourceOptions = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: '1211Kdcc11!',
    database: 'notesapi',
    entities: [`${__dirname}` + '/../**/entities/*.entity{.ts,.js}'],
    migrations: [`${__dirname}` + '/../db/migration/*{.ts,.js}'],
    synchronize: true,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
};


export const AppDS = new DataSource(DataSourceConfig);
