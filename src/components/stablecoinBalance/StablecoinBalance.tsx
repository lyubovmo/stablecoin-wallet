import React from 'react';
import styles from './styles.module.scss';

interface StablecoinBalanceProps {
  balance: number;
  onBtnClick: () => void;
}

const StablecoinBalance: React.FC<StablecoinBalanceProps> = ({ balance, onBtnClick }) => {
  return (
    <div>
      <h3 className={styles.title}>current balance</h3>
      <p className={styles.balance}>{balance} USDC</p>
      <div className={styles.btnRow}>
        <button className={styles.btnAdd} onClick={onBtnClick}>
          <span className={styles.btnText}>+</span>
        </button>
      </div>
    </div>
  );
};

export default StablecoinBalance;
