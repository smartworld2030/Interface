import { FAILURE, REQUEST, SUCCESS } from './'

export interface DefaultFreezeBankState {
  error: string
  loading: boolean
}
export interface DefaultFreezeState {
  error: string
  loading: boolean
}

export interface RequestFreeze {
  type: typeof REQUEST.FREEZE
}
export interface SeccessFreeze {
  type: typeof SUCCESS.FREEZE
}
export interface FailureFreeze {
  type: typeof FAILURE.FREEZE
  error: string
}

export type FreezeActionTypes = RequestFreeze | SeccessFreeze | FailureFreeze
