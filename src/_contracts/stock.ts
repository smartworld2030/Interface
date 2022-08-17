const stock = {
  address: {
    56: '0xa42ae0d06e96bfcdf026fb3877c2df1df9b9059e',
    97: '0xEF621FE75d24ce09642f73969eEFcA3f7FF61A72',
  },
  abi: [
    'event BuySmartCarStock(address indexed user, uint256 tokenAmount)',
    'event BuySmartRobotStock(address indexed user, uint256 tokenAmount)',
    'function BUSD() view returns(address)',
    'function CARS_STOCK_PRICE() view returns(uint256)',
    'function ROBOTS_STOCK_PRICE() view returns(uint256)',
    'function SMART_CARS() view returns(address)',
    'function SMART_ROBOTS() view returns(address)',
    'function busdBalanceOf(address) view returns(uint256)',
    'function buySmartCarStock(uint256 amount)',
    'function buySmartRobotStock(uint256 amount)',
    'function owner() view returns(address)',
    'function remainingCarStock() view returns(uint256)',
    'function remainingRobotStock() view returns(uint256)',
    'function stcBalanceOf(address) view returns(uint256)',
    'function strBalanceOf(address) view returns(uint256)',
  ],
}

export default stock
