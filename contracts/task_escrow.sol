// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is Ownable {
    using SafeERC20 for IERC20;

    IERC721 public nft;
    IERC20 public paymentToken;

    uint256 public feePercentage; // fee percentage to be cut from sale
    uint256 public constant FEE_DENOMINATOR = 10000; // to calculate fee percentage

    struct Listing {
        uint256 price;
        bool active;
        address seller;
    }

    mapping(uint256 => Listing) public tokenIdToListing;

    event ListingCreated(uint256 indexed tokenId, uint256 price, address indexed seller);
    event ListingCancelled(uint256 indexed tokenId, address indexed seller);
    event SaleCompleted(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 price);

    constructor(address _nftAddress, address _paymentTokenAddress, uint256 _feePercentage) {
        nft = IERC721(_nftAddress);
        paymentToken = IERC20(_paymentTokenAddress);
        feePercentage = _feePercentage;
    }

    function createListing(uint256 tokenId, uint256 price) external {
        require(nft.ownerOf(tokenId) == msg.sender, "You do not own this NFT");
        require(price > 0, "Price must be greater than zero");
        require(tokenIdToListing[tokenId].active == false, "This NFT is already listed");

        tokenIdToListing[tokenId] = Listing(price, true, msg.sender);
        emit ListingCreated(tokenId, price, msg.sender);
    }

    function cancelListing(uint256 tokenId) external {
        require(tokenIdToListing[tokenId].seller == msg.sender, "You are not the seller of this NFT");
        require(tokenIdToListing[tokenId].active == true, "This NFT is not listed for sale");

        delete tokenIdToListing[tokenId];
        emit ListingCancelled(tokenId, msg.sender);
    }
function buy(uint256 tokenId) external {
    Listing storage listing = tokenIdToListing[tokenId];
    require(listing.active == true, "This NFT is not listed for sale");

    address seller = listing.seller;
    uint256 price = listing.price;
    uint256 fee = (price * feePercentage) / FEE_DENOMINATOR;

    paymentToken.safeTransferFrom(msg.sender, address(this), price); // transfer payment to contract

    tokenIdToListing[tokenId].active = false; // mark listing as inactive to prevent multiple purchases

    emit SaleCompleted(tokenId, msg.sender, seller, price);

    // Payment is now held in the contract until the owner releases it
}
function releasePayment(uint256 tokenId) external onlyOwner {
    Listing storage listing = tokenIdToListing[tokenId];
    require(listing.active == false, "NFT is still listed for sale");
    require(listing.seller != address(this), "Payment has already been released");

    address seller = listing.seller; // Use the original seller address
    uint256 price = listing.price;
    uint256 fee = (price * feePercentage) / FEE_DENOMINATOR;

    paymentToken.safeTransfer(seller, price - fee); // transfer payment to seller
    paymentToken.safeTransfer(owner(), fee); // transfer fee to contract owner

    delete tokenIdToListing[tokenId];

    emit SaleCompleted(tokenId, msg.sender, seller, price - fee); // Emit event with correct price
}

    function updateFeePercentage(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage < FEE_DENOMINATOR, "Fee percentage must be less than 100%");
        feePercentage = _feePercentage;
    }
}