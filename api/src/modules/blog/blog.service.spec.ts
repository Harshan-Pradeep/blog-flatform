import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { IBlogRepository } from './repositories/blog.repository.interface';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CloudinaryService } from './cloudinary.service';
import { BlogStatus } from './enums/BlogStatus.enum';
import { NotFoundException } from '@nestjs/common';

jest.mock('../auth/entities/user.entity', () => ({
  User: class MockUser {}
}));

const mockBlogRepository = {
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockCloudinaryService = {
  uploadImage: jest.fn(),
};

describe('BlogService', () => {
  let service: BlogService;
  let blogRepository: IBlogRepository;
  let cloudinaryService: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: 'IBlogRepository',
          useValue: mockBlogRepository,
        },
        {
          provide: CloudinaryService,
          useValue: mockCloudinaryService,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    blogRepository = module.get<IBlogRepository>('IBlogRepository');
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    const createBlogDto: CreateBlogDto = {
      title: 'Test Blog',
      content: 'Test Content',
      status: BlogStatus.DRAFT,
    };

    const authorId = 1;

    const mockBlog: Blog = {
      id: 1,
      title: 'Test Blog',
      content: 'Test Content',
      status: BlogStatus.DRAFT,
      authorId: authorId,
      imageUrl: undefined,
      author: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a blog without image', async () => {
      mockBlogRepository.create.mockResolvedValue(mockBlog);

      const result = await service.create(createBlogDto, authorId);

      expect(result).toEqual(mockBlog);
      expect(mockBlogRepository.create).toHaveBeenCalledWith({
        ...createBlogDto,
        imageUrl: undefined,
        authorId,
      });
      expect(cloudinaryService.uploadImage).not.toHaveBeenCalled();
    });

    it('should create a blog with image', async () => {
      const mockImage = { 
        fieldname: 'image',
        originalname: 'test.jpg',
        buffer: Buffer.from('test'),
      } as Express.Multer.File;
      
      const mockImageUrl = 'http://cloudinary.com/image.jpg';
      mockCloudinaryService.uploadImage.mockResolvedValue(mockImageUrl);
      
      const blogWithImage = { ...mockBlog, imageUrl: mockImageUrl };
      mockBlogRepository.create.mockResolvedValue(blogWithImage);

      const result = await service.create(createBlogDto, authorId, mockImage);

      expect(result).toEqual(blogWithImage);
      expect(cloudinaryService.uploadImage).toHaveBeenCalledWith(mockImage);
      expect(mockBlogRepository.create).toHaveBeenCalledWith({
        ...createBlogDto,
        imageUrl: mockImageUrl,
        authorId,
      });
    });
  });

  describe('findById', () => {
    const mockBlog: Blog = {
      id: 1,
      title: 'Test Blog',
      content: 'Test Content',
      status: BlogStatus.PUBLISHED,
      authorId: 1,
      imageUrl: null,
      author: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should return a blog by id', async () => {
      mockBlogRepository.findById.mockResolvedValue(mockBlog);

      const result = await service.findById(1);

      expect(result).toEqual(mockBlog);
      expect(mockBlogRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should return null when blog is not found', async () => {
      mockBlogRepository.findById.mockResolvedValue(null);

      const result = await service.findById(999);

      expect(result).toBeNull();
      expect(mockBlogRepository.findById).toHaveBeenCalledWith(999);
    });
  });

  describe('findAll', () => {
    const mockBlogs: Blog[] = [
      {
        id: 1,
        title: 'Test Blog 1',
        content: 'Content 1',
        status: BlogStatus.PUBLISHED,
        authorId: 1,
        imageUrl: null,
        author: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'Test Blog 2',
        content: 'Content 2',
        status: BlogStatus.DRAFT,
        authorId: 1,
        imageUrl: null,
        author: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    it('should return all blogs', async () => {
      mockBlogRepository.findAll.mockResolvedValue(mockBlogs);

      const result = await service.findAll();

      expect(result).toEqual(mockBlogs);
      expect(mockBlogRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const updateBlogDto: UpdateBlogDto = {
      title: 'Updated Title',
      content: 'Updated Content',
    };

    const mockBlog: Blog = {
      id: 1,
      title: 'Updated Title',
      content: 'Updated Content',
      status: BlogStatus.PUBLISHED,
      authorId: 1,
      imageUrl: null,
      author: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should update a blog', async () => {
      mockBlogRepository.update.mockResolvedValue(mockBlog);

      const result = await service.update(1, updateBlogDto);

      expect(result).toEqual(mockBlog);
      expect(mockBlogRepository.update).toHaveBeenCalledWith(1, updateBlogDto);
    });
  });

  describe('delete', () => {
    it('should delete a blog', async () => {
      mockBlogRepository.delete.mockResolvedValue(undefined);

      await service.delete(1);

      expect(mockBlogRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when trying to delete non-existent blog', async () => {
      mockBlogRepository.delete.mockRejectedValue(new NotFoundException());

      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
      expect(mockBlogRepository.delete).toHaveBeenCalledWith(999);
    });
  });
});