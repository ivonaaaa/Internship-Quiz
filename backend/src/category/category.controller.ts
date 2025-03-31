import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AdminAuthGuard } from '../user/admin-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  async createCategory(
    @Request() req,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.createCategory(
      req.user.role,
      createCategoryDto,
    );
  }

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }
}
