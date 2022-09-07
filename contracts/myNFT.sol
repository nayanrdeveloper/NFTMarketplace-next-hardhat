// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721URIStorage {
    address payable owner;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _soldItems;

    uint256 listingPrice = 0.01 ether;

    constructor() ERC721("myNFT", "CORO") {
        owner = payable(msg.sender);
    }

    struct listedToken {
        uint256 _tokenId;
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
        uint256 currentTokenId = _tokenIds.current();
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
        return _tokenIds.current();
    }

    function createToken(string memory tokenURI, uint256 _price)
        public
        payable
        returns (uint256)
    {
        // require(msg.value == listingPrice, "Price are not enough for create token");
        // require(_price > 0, "Price are greater 0");
        _tokenIds.increment();
        uint256 currentTokenId = _tokenIds.current();
        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI);

        createListedToken(currentTokenId, _price);

        return currentTokenId;
    }

    function createListedToken(uint256 _tokenId, uint256 _price) private {
        idToListedToken[_tokenId] = listedToken(
            _tokenId,
            payable(address(this)),
            payable(msg.sender),
            _price,
            false
        );
    }

    function getAllNFTs() public view returns (listedToken[] memory) {
        uint256 tokenCount = _tokenIds.current();
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
        uint256 currentTokenId = _tokenIds.current();
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

    function executeSale(uint256 tokenId) public payable{
        uint256 price = idToListedToken[tokenId].price;
        require(msg.value == price, "PLease submit the asking for the NFT in order to Purchase");

        address seller = idToListedToken[tokenId].seller;

        idToListedToken[tokenId].currentlyListed = true;
        idToListedToken[tokenId].seller = payable(msg.sender);

        _transfer(address(this), msg.sender, tokenId);
        approve(address(this), tokenId);

        payable(owner).transfer(listingPrice);
        payable(seller).transfer(msg.value);

    }
}
