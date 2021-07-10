const swap = {
  address: {
    56: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    97: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  },
  decimals: { bnb: 18, stts: 8 },
  pair: {
    56: {
      bnb: [
        '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        '0x88469567a9e6b2dae2d8ea7d8c77872d9a0d43ec',
      ],
      stts: [
        '0x88469567a9e6b2dae2d8ea7d8c77872d9a0d43ec',
        '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      ],
    },
    97: {
      bnb: [
        '0xae13d989dac2f0debff460ac112a837c89baa7cd',
        '0xBFd0Ac6cD15712E0a697bDA40897CDc54b06D7Ef',
      ],
      stts: [
        '0xBFd0Ac6cD15712E0a697bDA40897CDc54b06D7Ef',
        '0xae13d989dac2f0debff460ac112a837c89baa7cd',
      ],
    },
  },
  abi: [
    'function WETH() view returns (address)',
    'function sortTokens(address tokenA,address tokenB) pure returns (address token0, address token1)',
    'function getAmountsIn(uint amountOut,address[] memory path) view returns (uint[] memory amounts)',
    'function getAmountsOut(uint amountIn,address[] memory path) view returns (uint[] memory amounts)',
    'function swapExactTokensForETH(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline)',
    'function swapExactTokensForETHSupportingFeeOnTransferTokens(uint amountIn,uint amountOutMin,address[] calldata path,address to,uint deadline)',
    'function swapExactETHForTokens(uint amountOutMin,address[] calldata path,address to,uint deadline) payable',
    'function swapExactETHForTokensSupportingFeeOnTransferTokens(uint amountOutMin,address[] calldata path,address to,uint deadline) payable',
  ],
}
export default swap
