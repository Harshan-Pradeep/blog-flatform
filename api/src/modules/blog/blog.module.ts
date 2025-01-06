import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { BlogRepository } from './repositories/blog.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogController],
  providers: [
    {
      provide: 'IBlogRepository',
      useClass: BlogRepository

    },
    BlogService],
    exports: [BlogService]
})
export class BlogModule {}
