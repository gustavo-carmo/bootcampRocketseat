import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {

    const balance = this.transactionsRepository.getBalance();

    // TODO - NÃO PERMITIR TYPOS DIFERENTES DE INCOME E OUTCOME
    // TODO - NÃO PERMITIR VALUES NEGATIVOS

    if (type === 'outcome' && balance.total < value) {
      throw Error('This transaction is invalid, the outcome is greater than current value');
    }

    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction;
  }
}

export default CreateTransactionService;
