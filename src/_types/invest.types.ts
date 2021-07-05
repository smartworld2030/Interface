import { FAILURE, REQUEST, SUCCESS } from './'

export interface DefaultInvestBankState {
  data: IInvest[]
  error: string
  loading: boolean
  nextLoad: number
}
export interface DefaultInvestState {
  data?: IInvest
  error: string
  loading: boolean
}

export interface IInvest {
  id: number
  title: string
  content: string
  slug: string
  description: string
  date: string
  teacher: string
  thumbnails: string
  categories: string[]
  tags: string[]
}

export interface RequestInvestBank {
  type: typeof REQUEST.INVEST_BANK
}
export interface SeccessInvestBank {
  type: typeof SUCCESS.INVEST_BANK
  payload: {
    data: IInvest[]
    nextLoad: number
  }
}
export interface FailureInvestBank {
  type: typeof FAILURE.INVEST_BANK
  error: string
}

export interface RequestInvest {
  type: typeof REQUEST.INVEST
}
export interface SeccessInvest {
  type: typeof SUCCESS.INVEST
  data: IInvest
}
export interface FailureInvest {
  type: typeof FAILURE.INVEST
  error: string
}

export type InvestActionTypes =
  | RequestInvestBank
  | SeccessInvestBank
  | FailureInvestBank
  | RequestInvest
  | SeccessInvest
  | FailureInvest
