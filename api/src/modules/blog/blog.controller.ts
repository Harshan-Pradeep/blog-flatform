import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    ParseIntPipe,
    HttpStatus,
    HttpCode,
    Request,
    UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { ResponseInterceptor } from '../../common/interceptors/response.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

@ApiTags('blogs')
@Controller('blogs')
@UseInterceptors(LoggingInterceptor, ResponseInterceptor)
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new blog post' })
    @ApiResponse({ 
        status: HttpStatus.CREATED, 
        description: 'Blog post created successfully'
    })
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createBlogDto: CreateBlogDto,
        @Request() req
    ): Promise<Blog> {
        return await this.blogService.create(createBlogDto, req.user.id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all blog posts' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Returns all blog posts'
    })
    async findAll(): Promise<Blog[]> {
        return await this.blogService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a blog post by id' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Returns a blog post'
    })
    async findOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Blog> {
        return await this.blogService.findById(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a blog post' })
    @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Blog post updated successfully'
    })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBlogDto: UpdateBlogDto,
        @Request() req
    ): Promise<Blog> {
        return await this.blogService.update(id, updateBlogDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a blog post' })
    @ApiResponse({ 
        status: HttpStatus.NO_CONTENT, 
        description: 'Blog post deleted successfully'
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @Request() req
    ): Promise<void> {
        await this.blogService.delete(id);
    }
}