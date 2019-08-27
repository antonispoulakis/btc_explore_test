pragma solidity ^0.5.7;
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract CappedMintableToken is ERC20Detailed, ERC20Capped {

    constructor(string memory name, string memory symbol, uint256 cap)
    ERC20Detailed(name, symbol, 18)
    ERC20Capped(cap)
    public {}
}
