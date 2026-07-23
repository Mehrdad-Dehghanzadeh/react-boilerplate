export enum EWallet {
  IRR = 'rial',
  Metal = 'metal'
}

export type TWallet = {
  balance: number
  freezed_balance: number
  wallet_type: 'IRR' | 'METAL'
}
