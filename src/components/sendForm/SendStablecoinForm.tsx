'use client';
import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';

interface SendStablecoinFormProps {
  onSubmit: (recipientAddress: string, amount: string) => void;
  balance: number;
  showModal?: boolean
}

const SendStablecoinForm: React.FC<SendStablecoinFormProps> = ({ onSubmit, balance, showModal= false }) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [recipientAddressError, setRecipientAddressError] = useState('');
  const [amountError, setAmountError] = useState('');

  useEffect(() => {
    setRecipientAddress('');
    setAmount('');
    setRecipientAddressError('');
    setAmountError('');
  }, [showModal]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  const handleFormSubmit = () => {
    const amountToSend = parseFloat(amount);
    if (!recipientAddress) {
      setRecipientAddressError('Please provide a valid recipient address.');
      return;
    }
    if (isNaN(amountToSend) || amountToSend <= 0) {
      setAmountError('Please enter a valid positive amount.');
      return;
    }

    if (amountToSend > balance) {
      setAmountError('Insufficient balance. Cannot send more than available balance.');
      return;
    }
    onSubmit(recipientAddress, amount);
    setRecipientAddress('');
    setAmount('');
    setRecipientAddressError('');
    setAmountError('');
  };

  return (
    <form className={styles.sendForm}>
      <div className={styles.row}>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className={styles.formControl}
        />
        {recipientAddressError && <span className={styles.error}>{recipientAddressError}</span>}
      </div>

      <div className={styles.row}>
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
          className={styles.formControl}
        />
        {amountError && <span className={styles.error}>{amountError}</span>}
      </div>

      <button type="button" onClick={handleFormSubmit} className={styles.btnSend}>
        Send
      </button>
    </form>
  );
};

export default SendStablecoinForm;


