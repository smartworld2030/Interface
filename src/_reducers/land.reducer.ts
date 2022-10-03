import {
  DefaultLandState,
  LandActionTypes,
  LAND_ACCOUNT_FAILURE,
  LAND_ACCOUNT_REQUEST,
  LAND_ACCOUNT_SUCCESS,
  LAND_DATA_FAILED,
  LAND_DATA_REQUEST,
  LAND_DATA_SUCCESS,
  LAND_METHOD_FAILURE,
  LAND_METHOD_REQUEST,
  LAND_METHOD_SUCCESS,
  LAND_TRANSACTION_MINED,
  LAND_TRANSACTION_READY,
  MAP_DATA_RESET,
  TILES_DATA_FAILED,
  TILES_DATA_REQUEST,
  TILES_DATA_SUCCESS,
} from '_types/land.types'

const landData = {
  error: '',
  loading: true,
  mapData: null,
  attributes: [],
  name: '',
  image: '',
  tileMap: null,
  hashData: '',
  external_url: '',
  description: '',
}

const initialState: DefaultLandState = {
  loading: true,
  tilesLoading: true,
  error: '',
  landPrice: '500000000000000000',
  tilesData: [],
  landData,
  mapData: null,
  landsIds: [],
  landsData: {},
  landsOwners: {},
  ownedLands: [],
  totalSupply: 0,
}

export const landReducer = (
  state = initialState,
  action: LandActionTypes
): DefaultLandState => {
  switch (action.type) {
    case MAP_DATA_RESET:
      return {
        ...state,
        mapData: null,
      }
    case LAND_DATA_REQUEST:
      return {
        ...state,
        mapData: state.tilesData[action.payload.landId],
        landData: {
          ...state.landData,
          tileMap: null,
          loading: true,
          error: '',
        },
      }
    case LAND_DATA_SUCCESS:
      return {
        ...state,
        landData: {
          ...state.landData,
          ...action.payload,
          loading: false,
          error: '',
        },
      }

    case LAND_DATA_FAILED:
      return {
        ...state,
        landData: {
          ...state.landData,
          error: action.payload.error,
          loading: false,
        },
      }
    case TILES_DATA_REQUEST:
      return {
        ...state,
        tilesLoading: true,
      }
    case TILES_DATA_SUCCESS:
      return {
        ...state,
        tilesLoading: false,
        tilesData: action.payload,
      }
    case TILES_DATA_FAILED:
      return {
        ...state,
        tilesLoading: false,
        error: action.payload.error,
      }
    case LAND_METHOD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LAND_METHOD_SUCCESS:
      return {
        ...state,
        loading: true,
        ...action.payload,
      }
    case LAND_METHOD_FAILURE:
      return {
        ...state,
        loading: false,

        ...action.payload,
      }
    case LAND_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LAND_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      }
    case LAND_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,

        ...action.payload,
      }
    case LAND_TRANSACTION_MINED:
      return {
        loading: false,

        ...state,
      }
    case LAND_TRANSACTION_READY:
      return {
        loading: false,

        ...state,
      }

    default:
      return state
  }
}
