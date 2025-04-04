import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { Coffee } from './src/coffees/entities/coffee.entity';
import { Flavor } from './src/coffees/entities/flavor.entity';
import { CoffeeRefactor1743433758562 } from './src/migrations/1743433758562-CoffeeRefactor';
import { SchemaSync1743434418986 } from './src/migrations/1743434418986-SchemaSync';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1743433758562, SchemaSync1743434418986],
});
