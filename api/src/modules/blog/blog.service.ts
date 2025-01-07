import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IBlogRepository } from './repositories/blog.repository.interface';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog } from './entities/blog.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepository } from './repositories/blog.repository';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class BlogService {

    constructor(
            @Inject('IBlogRepository')
            private blogRepository: BlogRepository,
            private cloudinaryService: CloudinaryService,
        ) {}

    async create(createBlogDto: CreateBlogDto, authorId: number, image?: Express.Multer.File): Promise<Blog> {
        let imageUrl: string | undefined;

        if (image) {
            imageUrl = await this.cloudinaryService.uploadImage(image);
        }

        return await this.blogRepository.create({
            ...createBlogDto,
            imageUrl,
            authorId
        });
    }

    async findById(id: number): Promise<Blog> {
        return await this.blogRepository.findById(id);
    }

    async findAll(): Promise<Blog[]> {
        return await this.blogRepository.findAll();
    }

    async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        return await this.blogRepository.update(id, updateBlogDto);
    }

    async delete(id: number): Promise<void> {
        await this.blogRepository.delete(id);
    }
}
