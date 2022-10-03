const land = {
  prefix: 'https://ipfs.io/',
  ipfs: 'https://ipfs.io/ipfs/bafybeihet3fxfc7pua5bclg37aafgoohbxxsvobfohxcdk7mljz2l22uoi',
  address: {
    56: '0xBa7757cf693d03600952d883151714746E215C88',
    97: '0xc4bD7468f3bC74b5D9A6897a3CBe0894777F500d',
  },
  abi: [
    'function mint(address referrer, uint256 tokenId, bytes data) payable public',
    'function ownerOf(uint256 tokenId) public view returns (address)',
    'function LAND_PRICE() public view returns (uint256)',
    'function isUser(address owner) public view returns (bool)',
    'function balanceOf(address owner) public view returns (uint256)',
    'function landData(uint256 tokenId) public view returns (bytes)',
    'function tokenURI(uint256 tokenId) public view returns (string)',
    'function tokenByIndex(uint256 index) public view returns (uint256)',
    'function totalSupply() public view returns (uint256)',
    'function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)',
  ],
}

export default land
