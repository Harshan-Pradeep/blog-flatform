import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { BlogStatus } from '../enums/BlogStatus.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBlogDto {
    @ApiProperty({
        description: 'The title of the blog post',
        example: 'My First Blog Post'
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'The main content of the blog post',
        example: 'This is the content of my first blog post...'
    })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiPropertyOptional({
        enum: BlogStatus,
        description: 'The status of the blog post',
        example: BlogStatus.DRAFT
    })
    @IsOptional()
    @IsEnum(BlogStatus)
    status?: BlogStatus;

    @ApiPropertyOptional({
        type: 'string',
        format: 'binary',
        description: 'Optional image file for the blog post'
    })
    @IsOptional()
    image?: Express.Multer.File;
}