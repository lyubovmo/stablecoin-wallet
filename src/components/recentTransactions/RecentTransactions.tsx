import React from 'react';
import styles from './styles.module.scss';
import { Transaction } from '@/types';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions}) => {
  return (
    <div className={styles.transactionsBlock}>
      <h3 className={styles.title}>Transaction history</h3>
      <div>
        {transactions.map((transaction) => (
          <div className={styles.transaction} key={transaction.id}>
            <div>
              <div className={styles.date}>{transaction.date}</div>
              <div>{transaction.type}</div>
            </div>
            <div className={[styles.amount, styles[transaction.type.toLowerCase()]].join(' ')}>{transaction.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
