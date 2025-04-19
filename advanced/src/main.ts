import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Coffee } from './coffees/entities/coffee.entity';
import { WithUuid } from './common/mixins/with-uuid.mixin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const CoffeeWithUuidCls = WithUuid(Coffee);
  const coffee = new CoffeeWithUuidCls('Buddy Brew');
  console.log('Before: ', coffee);
  coffee.regenerateUuid();
  console.log('After: ', coffee);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
