import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(function (accum, curr) {
      if (curr.type === 'income') {
        return accum + curr.value;
      }
      return accum;
    }, 0);

    const outcome = this.transactions.reduce(function (accum, curr) {
      if (curr.type === 'outcome') {
        return accum + curr.value;
      }
      return accum;
    }, 0);

    this.balance = { income, outcome, total: income - outcome };

    const { balance } = this;

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
