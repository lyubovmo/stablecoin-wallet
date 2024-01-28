'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import styles from './page.module.scss';
import StablecoinBalance from '@/components/stablecoinBalance/StablecoinBalance';
import RecentTransactions  from '@/components/recentTransactions/RecentTransactions';
import SendStablecoinForm from '@/components/sendForm/SendStablecoinForm';
import Modal from "@/components/modal/Modal";
import mockedTransactions from '@/data/transactions.json';
import userData from '@/data/userData.json';
import { TransactionType } from '@/types';

const HomePage: React.FC = () => {
  const [balance, setBalance] = useState(userData.balance);
  const [transactions, setTransactions] = useState(mockedTransactions);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const addTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
    setBalance(balance - parseFloat(newTransaction.amount));
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const handleSubmit = (recipientAddress, amount) => {
    const newTransaction = {
      id: transactions.length + 1,
      type: TransactionType.SENT,
      amount: `${amount} USDC`,
      date: formatDate(new Date()),
    };
    addTransaction(newTransaction);
    if (showModal) {
      toggleModal();
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Stablecoin Wallet</title>
        <meta name="description" content="Stablecoin Wallet" />
      </Head>

      <main className={styles.main}>
        <section className={styles.balanceSection}>
          <h1 className={styles.title}>your wallet</h1>
          <StablecoinBalance balance={balance} onBtnClick={toggleModal}/>
        </section>
        <section className={styles.bottomSection}>
          <RecentTransactions transactions={transactions} />
          <div className={styles.hideMobile}>
            <SendStablecoinForm onSubmit={handleSubmit} balance={balance} />
          </div>
        </section>
      </main>
      <Modal isOpen={showModal} onClose={toggleModal}>
          <SendStablecoinForm showModal={showModal} onSubmit={handleSubmit} balance={balance}/>
      </Modal>
    </div>
  );
};

export default HomePage;
