import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import CreateCategoryService from './CreateCategoryService';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const categoriesRepository = getRepository(Category);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (value <= 0) {
      throw new AppError(
        "The value of transaction can't be less or equals than zero",
      );
    }

    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('The transaction type must be income or outcome');
    }

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError(
        'This transaction is invalid, the outcome is greater than current value',
      );
    }

    let findCategoryByTitle = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!findCategoryByTitle) {
      const createCategoryService = new CreateCategoryService();

      findCategoryByTitle = await createCategoryService.execute({
        title: category,
      });

      if (!findCategoryByTitle) {
        throw new AppError("The Category wasn't create");
      }
    }

    const transaction = await transactionsRepository.create({
      title,
      value,
      type,
      category_id: findCategoryByTitle.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
