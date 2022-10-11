const multi = {
  address: {
    56: '0x41263cBA59EB80dC200F3E2544eda4ed6A90E76C',
    97: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
  },
  abi: [
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'target', type: 'address' },
            { internalType: 'bytes', name: 'callData', type: 'bytes' },
          ],
          internalType: 'struct Multicall.Call[]',
          name: 'calls',
          type: 'tuple[]',
        },
      ],
      name: 'aggregate',
      outputs: [
        { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
        { internalType: 'bytes[]', name: 'returnData', type: 'bytes[]' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'blockNumber', type: 'uint256' },
      ],
      name: 'getBlockHash',
      outputs: [
        { internalType: 'bytes32', name: 'blockHash', type: 'bytes32' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCurrentBlockCoinbase',
      outputs: [{ internalType: 'address', name: 'coinbase', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCurrentBlockDifficulty',
      outputs: [
        { internalType: 'uint256', name: 'difficulty', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCurrentBlockGasLimit',
      outputs: [{ internalType: 'uint256', name: 'gaslimit', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCurrentBlockTimestamp',
      outputs: [
        { internalType: 'uint256', name: 'timestamp', type: 'uint256' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'addr', type: 'address' }],
      name: 'getEthBalance',
      outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getLastBlockHash',
      outputs: [
        { internalType: 'bytes32', name: 'blockHash', type: 'bytes32' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
}

export default multi
