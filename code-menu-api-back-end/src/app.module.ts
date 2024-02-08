import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { AuthController } from './login/login.controller';
import { UserService } from './login/login.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'babar.db.elephantsql.com',
      port: 5432,
      username: 'hgcilqgu',
      password: 'ISwYFpenA03Tc-vCEGTFA9y-KSd6oDcS',
      database: 'hgcilqgu',
      synchronize: true,
      entities: [Category, Product],
    }),
    TypeOrmModule.forFeature([Category, Product]),
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AppController,
    CategoryController,
    ProductController,
    AuthController,
  ],
  providers: [AppService, CategoryService, ProductService, UserService],
})
export class AppModule {}
