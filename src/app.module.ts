import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AplicacionesModule } from './modules/aplicaciones/aplicaciones.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    AplicacionesModule
  ],
})
export class AppModule {
}
