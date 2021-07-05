import { FAILURE, REQUEST, SUCCESS, SAVE } from './'

export interface DefaultFreezeBankState {
  error: string
  loading: boolean
}
export interface DefaultFreezeState {
  error: string
  loading: boolean
}

export interface RequestFreezeBank {
  type: typeof REQUEST.FREEZE_BANK
}
export interface SeccessFreezeBank {
  type: typeof SUCCESS.FREEZE_BANK
}

export interface SaveFreezeBank {
  type: typeof SAVE.FREEZE_BANK
}

export interface FailureFreezeBank {
  type: typeof FAILURE.FREEZE_BANK
  error: string
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

export type FreezeActionTypes =
  | RequestFreezeBank
  | SeccessFreezeBank
  | FailureFreezeBank
  | SaveFreezeBank
  | RequestFreeze
  | SeccessFreeze
  | FailureFreeze
