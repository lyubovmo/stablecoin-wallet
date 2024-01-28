export enum TransactionType {
  SENT = 'Sent',
  RECEIVED = 'Received'
}

export interface Transaction {
  id: number,
  type: TransactionType,
  amount: string,
  date: string,
}
