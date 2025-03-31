import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(userRole: string, createCategoryDto: CreateCategoryDto) {
    if (userRole !== 'ADMIN')
      throw new ForbiddenException('Only admins can create categories.');

    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        image: createCategoryDto.image,
      },
    });
  }

  async getAllCategories() {
    return this.prisma.category.findMany();
  }
}
