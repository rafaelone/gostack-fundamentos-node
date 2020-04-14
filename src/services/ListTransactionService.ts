import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class ListTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): object {
    const transactions = this.transactionsRepository.all();

    const sumTotal = (total: number, transaction: Transaction): number =>
      total + transaction.value;

    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(sumTotal, 0);

    const outcome = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(sumTotal, 0);

    const response = {
      transactions,
      balance: {
        income,
        outcome,
        total: income - outcome,
      },
    };

    return response;
  }
}

export default ListTransactionService;
