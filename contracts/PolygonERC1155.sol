//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PolygonERC1155 is ERC1155URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    string public name;

    // uint256 public constant GOLD = 0;
    // uint256 public constant SILVER = 1;
    // uint256 public constant BRONZE = 2;
    // uint256 public constant DIAMOND = 3;
    uint256[] items;
    uint256[] amounts;

    constructor(string memory name_) public ERC1155("https://bafybeiayjo32impaoa4i7pw3utzj4zkdvex6ixuirgosqrzxq65xdziyzm.ipfs.nftstorage.link/{id}.json") {
        name = name_;

        // _mint(msg.sender, GOLD, 10**18, "");
        // _mint(msg.sender, SILVER, 10**27, "");
        // _mint(msg.sender, BRONZE, 10**30, "");
        // _mint(msg.sender, DIAMOND, 1, "");
        for(uint256 i = 0; i < 4; i++) {
            items.push(i);
        }

        amounts = [10**18, 10**27, 10**30, 1];

        _mintBatch(msg.sender, items, amounts, "");

    }

    function mint(address recipient, uint256 tokenId, uint256 amount) public onlyOwner{
        _mint(recipient, tokenId, amount, "");
    }

    function burn(uint256 tokenId, uint amount) public onlyOwner {
        _burn(msg.sender, tokenId, amount);
    }
    
    function uri(uint256 tokenId) override public view returns (string memory) {
        return (
            string(abi.encodePacked(
                "https://bafybeiayjo32impaoa4i7pw3utzj4zkdvex6ixuirgosqrzxq65xdziyzm.ipfs.nftstorage.link/",
                Strings.toString(tokenId),
                ".json"
            ))
        );
    }

}