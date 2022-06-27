const invest = {
  address: {
    56: '0xeB2F87B4fF2C35bf1a56B97bAd9bd8Bbf06768bA',
    97: '0xBf8095420fc2014288AC8eB279873cf0aDcf1957',
  },
  abi: [
    'event UpdateUser(address indexed user, uint256 value)',
    'event WithdrawInterest(address indexed user, uint256 hourly, uint256 referrals)',
    'event RegisterUser(address indexed user, address indexed referrer, uint256 value)',
    'function FEE() public view returns (uint256)',
    'function MINIMUM_INVEST() public view returns (uint256)',
    'function MAXIMUM_INVEST() public view returns (uint256)',
    'function REFERRAL_PERCENT() public view returns (uint256)',
    'function blacklist(address user) public view returns (bool)',
    'function monthlyReward(uint256 value) public view returns (uint256)',
    'function hourlyReward(uint256 value) public view returns (uint256)',
    'function BNBtoUSD(uint256 value) public view returns (uint256)',
    'function BNBtoUSDWithFee(uint256 value) public view returns (uint256)',
    'function USDtoBNB(uint256 value) public view returns (uint256)',
    'function BNBPrice() public view returns (uint256)',
    'function refMultiplier(address user, uint8 level) public view returns (uint256)',
    'function invest(address referrer) payable returns (bool)',
    'function withdrawInterest() returns (bool)',
    'function calculateInterest(address user) public view returns (uint256 hourly,uint256 referral,uint256 requestTime)',
    'function calculateHourly(address sender, uint256 time) public view returns (uint256 current, uint256 past)',
    'function userDepositNumber(address user) public view returns (uint256)',
    'function userDepositDetails(address user, uint256 index) public view returns (uint256 amount,uint256 reward,uint256 startTime,uint256 endTime)',
    'function userListLength() public view returns (uint256)',
    'function userList(uint256 index) public view returns (address)',
    'function users(address user) public view returns (address referrer,uint256 refAmounts,uint256 totalAmount,uint256 latestWithdraw)',
  ],
}

export default invest
