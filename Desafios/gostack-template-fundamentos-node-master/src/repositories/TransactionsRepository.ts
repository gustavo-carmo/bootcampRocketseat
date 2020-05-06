import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((acumulator: Balance, transaction: Transaction) => {

      switch (transaction.type) {
        case "income":
          acumulator.income += transaction.value;
          break;
        case "outcome":
          acumulator.outcome += transaction.value;
          break;
        default:
          break;
      }

      return acumulator;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ type, title, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ type, title, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
