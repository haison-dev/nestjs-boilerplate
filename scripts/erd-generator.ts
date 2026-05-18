import 'dotenv/config';
import { TypeormMarkdownGenerator } from 'typeorm-markdown-generator';
import DataSource from '../src/database/data-source';

const generateErd = async () => {
  const generator = new TypeormMarkdownGenerator(DataSource as never, {
    entityPath: 'src/**/*.entity.ts',
    title: 'E-commerce Postgres ERD',
    outFilePath: '.tmp/erd.md',
    indexTable: true,
  });

  await generator.build();
};

void generateErd();
