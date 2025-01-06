import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { BlogStatus } from '../enums/BlogStatus.enum';

export class CreateBlogDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsEnum(BlogStatus)
    status?: BlogStatus;
}