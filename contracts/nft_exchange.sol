pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract TokenExchange is ERC721Holder {
    // Token exchange event
    event TokenExchanged(address indexed sender, address indexed recipient, address indexed tokenContract, uint256 senderTokenId, uint256 recipientTokenId);

    // Function to exchange tokens
function exchangeTokens(address _senderTokenContract, uint256 _senderTokenId, address _recipient, address _recipientTokenContract, uint256 _recipientTokenId) public {
    // Check if contract is approved to transfer sender's token
    require(IERC721(_senderTokenContract).getApproved(_senderTokenId) == address(this), "TokenExchange: Contract not approved to transfer sender's token");

    // Transfer sender's token to recipient
    IERC721(_senderTokenContract).safeTransferFrom(msg.sender, _recipient, _senderTokenId);

    // Check if contract is approved to transfer recipient's token
    require(IERC721(_recipientTokenContract).getApproved(_recipientTokenId) == address(this), "TokenExchange: Contract not approved to transfer recipient's token");

    // Transfer recipient's token to sender
    IERC721(_recipientTokenContract).safeTransferFrom(_recipient, msg.sender, _recipientTokenId);

    // Emit exchange event
    emit TokenExchanged(msg.sender, _recipient, _senderTokenContract, _senderTokenId, _recipientTokenId);
}
}