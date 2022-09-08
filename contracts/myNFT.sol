// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 

contract MyNFT is ReentrancyGuard {
    address payable owner;
    using Counters for Counters.Counter;

    Counters.Counter private _itemId;
    Counters.Counter private _soldItems;

    uint256 listingPrice = 0.01 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct listedToken {
        uint256 itemId;
        uint256 _tokenId;
        address nftContract;
        address payable seller;
        address payable owner;
        uint256 price;
        bool currentlyListed;
    }

    mapping(uint256 => listedToken) private idToListedToken;

    function updateListedPrice(uint256 _updateNewPrice) public {
        require(owner == msg.sender, "Only Owner Change the price");
        listingPrice = _updateNewPrice;
    }

    function getListedPrice() public view returns (uint256) {
        return listingPrice;
    }

    function latestListeddToken() public view returns (listedToken memory) {
        uint256 currentTokenId = _itemId.current();
        return idToListedToken[currentTokenId];
    }

    function getListedTokenByTokenId(uint _tokenId)
        public
        view
        returns (listedToken memory)
    {
        return idToListedToken[_tokenId];
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _itemId.current();
    }

    function createToken(address nftContract,uint256  tokenId, uint256 _price)
        public
        payable nonReentrant
        returns (uint256)
    {
        require(_price > 0, "Price greate than 0 wei");
        require(msg.value == listingPrice, "Price must be Equal to listing Price");
        _itemId.increment();
        uint256 currentItemId = _itemId.current();
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        // require(msg.value == listingPrice, "Price are not enough for create token");
        // require(_price > 0, "Price are greater 0");
        // _itemId.increment();
        // uint256 currentTokenId = _itemId.current();
        // _safeMint(msg.sender, currentTokenId);
        // _setTokenURI(currentTokenId, tokenURI);

        createListedToken(currentItemId,tokenId, nftContract,_price);

        return currentItemId;
    }

    function createListedToken(uint256 itemId,uint256 _tokenId,address nftContract ,uint256 _price) private {
        idToListedToken[_tokenId] = listedToken(
            itemId,
            _tokenId,
            nftContract,
            payable(msg.sender),
            payable(address(0)),
            _price,
            false
        );
    }

    function getAllNFTs() public view returns (listedToken[] memory) {
        uint256 tokenCount = _itemId.current();
        uint256 indexNo = 0;
        listedToken[] memory tokens = new listedToken[](tokenCount);

        for (uint i = 0; i < tokenCount; i++) {
            uint currentTokenId = i + 1;
            listedToken storage currentIem = idToListedToken[currentTokenId];
            tokens[indexNo] = currentIem;
            indexNo += 1;
        }
        return tokens;
    }

    function getMyNFT() public view returns (listedToken[] memory) {
        uint256 currentTokenId = _itemId.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint i = 0; i < currentTokenId; i++) {
            if (
                idToListedToken[i + 1].owner == msg.sender ||
                idToListedToken[i + 1].seller == msg.sender
            ) {
                itemCount += 1;
            }
        }

        listedToken[] memory tokens = new listedToken[](itemCount);

        for (uint i = 0; i < currentTokenId; i++) {
            if (
                idToListedToken[i + 1].owner == msg.sender ||
                idToListedToken[i + 1].seller == msg.sender
            ) {
                listedToken storage currentToken = idToListedToken[i + 1];
                tokens[currentIndex] = currentToken;
                currentIndex += 1;
            }
        }

        return tokens;
    }

    function executeSale(address nftContract, uint256 itemId) public payable nonReentrant{
        uint price = idToListedToken[itemId].price;
        uint tokenId = idToListedToken[itemId]._tokenId;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        idToListedToken[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToListedToken[itemId].owner = payable(msg.sender);
        idToListedToken[itemId].currentlyListed = true;
        _soldItems.increment();
        payable(owner).transfer(listingPrice);

    }
}
