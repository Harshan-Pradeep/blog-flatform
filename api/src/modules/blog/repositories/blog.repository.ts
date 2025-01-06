import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IBlogRepository } from "./blog.repository.interface";
import { DataSource, Repository } from "typeorm";
import { Blog } from "../entities/blog.entity";


@Injectable()
export class BlogRepository implements IBlogRepository {
    private repository: Repository<Blog>;

  constructor(
    @Inject('DATA_SOURCE') 
    private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Blog);
  }

    async create(blog: Partial<Blog>): Promise<Blog> {
        const newBlog = this.repository.create(blog);
        return await this.repository.save(newBlog);
    }

    async findById(id: number): Promise<Blog | null> {
        const blog=  await this.repository.findOne({
            where: { id },
            relations: ['author']
        });

        if (!blog) {
            throw new NotFoundException(`Blog with ID ${id} not found`);
        }

        return blog;
    }

    async findAll(): Promise<Blog[]> {
        return await this.repository.find({
            relations: ['author'],
            order: { createdAt: 'DESC' }
        });
    }

    async update(id: number, blogData: Partial<Blog>): Promise<Blog> {
        const blog = await this.findById(id);
        Object.assign(blog, blogData);
        return await this.repository.save(blog);
    }

    async delete(id: number): Promise<void> {
        const result = await this.repository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException('Blog not found')
        }
    }
}