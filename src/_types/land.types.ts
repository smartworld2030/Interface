import { Transaction } from 'ethers'

export const MAP_DATA_RESET = 'MAP_DATA_RESET'

export const LAND_DATA_REQUEST = 'LAND_DATA_REQUEST'
export const LAND_DATA_SUCCESS = 'LAND_DATA_SUCCESS'
export const LAND_DATA_FAILED = 'LAND_DATA_FAILED'

export const TILES_DATA_REQUEST = 'TILES_DATA_REQUEST'
export const TILES_DATA_SUCCESS = 'TILES_DATA_SUCCESS'
export const TILES_DATA_FAILED = 'TILES_DATA_FAILED'

export const MINT_LAND_REQUEST = 'MINT_LAND_REQUEST'
export const MINT_LAND_SUCCESS = 'MINT_LAND_SUCCESS'
export const MINT_LAND_FAILURE = 'MINT_LAND_FAILURE'

export const LAND_METHOD_REQUEST = 'LAND_METHOD_REQUEST'
export const LAND_METHOD_SUCCESS = 'LAND_METHOD_SUCCESS'
export const LAND_METHOD_FAILURE = 'LAND_METHOD_FAILURE'

export const LAND_ACCOUNT_REQUEST = 'LAND_ACCOUNT_REQUEST'
export const LAND_ACCOUNT_SUCCESS = 'LAND_ACCOUNT_SUCCESS'
export const LAND_ACCOUNT_FAILURE = 'LAND_ACCOUNT_FAILURE'

export const LAND_TRANSACTION_MINED = 'LAND_TRANSACTION_MINED'
export const LAND_TRANSACTION_READY = 'LAND_TRANSACTION_READY'

export interface DefaultLandState extends LandsData {
  loading: boolean
  tilesLoading: boolean
  error: string
  mapData: MapData | null
  landData: LandData
  landPrice: string
  ownedLands: number[]
  tilesData: MapData[]
}

export interface LandData {
  error: string
  loading: boolean
  name: string
  external_url: string
  description: string
  image: string
  hashData: string
  tileMap: number[]
  mapData: MapData
  attributes: Attribute[]
}

export interface Attribute {
  trait_type: string
  value: number | string
}

export interface MapData {
  id: number
  phi: number
  theta: number
  lat: number
  lng: number
  color: number
}

export interface LandsData {
  landsIds: number[]
  landsData: { [key: number]: string }
  landsOwners: { [key: number]: string }
  totalSupply: number
}

export interface MapActionReset {
  type: typeof MAP_DATA_RESET
}

export interface LandActionRequest {
  type: typeof LAND_DATA_REQUEST
  payload: { landId: number }
}

export interface LandActionSuccess {
  type: typeof LAND_DATA_SUCCESS
  payload: LandData
}

export interface TilesActionRequest {
  type: typeof TILES_DATA_REQUEST
}

export interface TilesActionSuccess {
  type: typeof TILES_DATA_SUCCESS
  payload: MapData[]
}

export interface TilesActionFailure {
  type: typeof TILES_DATA_FAILED
  payload: { error: string }
}

export interface LandActionFailed {
  type: typeof LAND_DATA_FAILED
  payload: { error: string }
}

export interface MintLandRequestAction {
  type: typeof MINT_LAND_REQUEST
}

export interface MintLandSuccessAction {
  type: typeof MINT_LAND_SUCCESS
  payload: { transaction: Transaction }
}

export interface MintLandFailureAction {
  type: typeof MINT_LAND_FAILURE
  payload: { error: string }
}

export interface LandMethodRequestAction {
  type: typeof LAND_METHOD_REQUEST
}

export interface LandMethodSuccessAction {
  type: typeof LAND_METHOD_SUCCESS
  payload: { transaction: Transaction }
}

export interface LandMethodFailureAction {
  type: typeof LAND_METHOD_FAILURE
  payload: { error: string }
}

export interface LandTransactionMinedAction {
  type: typeof LAND_TRANSACTION_MINED
}

export interface LandTransactionReadyAction {
  type: typeof LAND_TRANSACTION_READY
}

export interface LandAccountRequestAction {
  type: typeof LAND_ACCOUNT_REQUEST
}

export interface LandAccountSuccessAction {
  type: typeof LAND_ACCOUNT_SUCCESS
  payload: LandsData
}

export interface LandAccountFailureAction {
  type: typeof LAND_ACCOUNT_FAILURE
  payload: { error: string }
}

export type LandActionTypes =
  | TilesActionRequest
  | TilesActionSuccess
  | TilesActionFailure
  | MapActionReset
  | LandActionRequest
  | LandActionSuccess
  | LandActionFailed
  | MintLandRequestAction
  | MintLandSuccessAction
  | MintLandFailureAction
  | LandMethodRequestAction
  | LandMethodSuccessAction
  | LandMethodFailureAction
  | LandTransactionMinedAction
  | LandTransactionReadyAction
  | LandAccountRequestAction
  | LandAccountSuccessAction
  | LandAccountFailureAction
