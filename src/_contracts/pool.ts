const invest = {
  address: {
    56: '0x8f2974a63C3Df971d1A8ff5FdCebC49ae05948E3',
    97: '0x2DB73E3EcdFEa11A649a309635Aa37746396Ffdd',
  },
  abi: [
    'event WithdrawInterest(address indexed user, uint256 daily, uint256 referrals)',
    'event Freeze(address indexed user, address indexed referrer, uint256 amount)',
    'event Unfreeze(address indexed user, uint256 sttsAmount, uint256 bnbAmount)',
    'event UpdateFreeze(address indexed user, uint256 amount)',
    'function users(address)view returns(address referrer,uint256 liquidity,uint256 totalStts,uint256 refAmounts,uint256 latestWithdraw)',
    'function maxStts()view returns(uint256 stts)',
    'function freezePrice()view returns(uint256 stts, uint256 bnb)',
    'function updatePrice(address user)view returns(uint256 stts, uint256 bnb)',
    'function userFreezeInfo(address user, uint256 percent)view returns(uint256 stts,uint256 bnb,uint256 minStts,uint256 minBnb,uint256 slippage)',
    'function userUnfreezeInfo(address user, uint256 percent)view returns(uint256 stts,uint256 bnb,uint256 minStts,uint256 minBnb,uint256 slippage)',
    'function priceInfo(uint256 stts, uint256 percent)view returns(uint256 bnb,uint256 minStts,uint256 minBnb,uint256 slippage)',
    'function freeze(address referrer,uint256 amountSTTSMin,uint256 amountBNBMin,uint256 deadline) payable',
    'function updateFreeze(uint256 amountSTTSMin,uint256 amountBNBMin,uint256 deadline) payable',
    'function unfreeze(uint256 amountSTTSMin,uint256 amountBNBMin,uint256 deadline)',
    'function calulateBnb(uint256 stts)view returns(uint256 bnb)',
    'function withdrawInterest() returns(bool)',
    'function calculateInterest(address user)view returns(uint256 daily,uint256 referral,uint256 requestTime)',
    'function calculateDaily(address user,uint256 time)view returns(uint256 daily)',
    'function userDepositNumber(address user)view returns(uint256)',
    'function userDepositTimes(address user)view returns(uint256[] memory)',
    'function userExpireTime(address user)view returns(uint256)',
    'function userExpired(address user)view returns(bool)',
  ],
}

export default invest
