import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const checkIfCategorieExist = await categoriesRepository.findOne({
      where: {
        title,
      },
    });

    if (checkIfCategorieExist) {
      throw new AppError('Category already exists');
    }

    const category = await categoriesRepository.create({
      title,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
