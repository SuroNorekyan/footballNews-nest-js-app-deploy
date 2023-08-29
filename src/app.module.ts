// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { PostController } from './post/controller/post.controller';
import { PostService } from './post/service/post.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';

const databaseUrl =
  process.env.DATABASE_URL ||
  'mongodb+srv://surosuro:t8elNujcuiMJhs58@cluster0.vd1jepj.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(databaseUrl),
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, PostController], // Remove UserController as it's provided by UsersModule
  providers: [AppService, PostService], // Remove PostService, UsersService, and AuthService as they are provided by respective modules
})
export class AppModule {}
