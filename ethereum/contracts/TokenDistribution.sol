pragma solidity >=0.4.22 <0.6.0;

import "./CappedMintableToken.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";


contract TokenDistribution is Ownable {
    CappedMintableToken token;


    constructor (address _tokenAddress) public {
        token = CappedMintableToken(_tokenAddress);
    }

    function distribute(address[] memory contributors, uint256[] memory balances) public onlyOwner returns(bool) {
        require(contributors.length > 0, "Can not process an empty array");
        require(contributors.length == balances.length, "The contributors and balances arrays' lengths do not match");

        for(uint256 i = 0; i < contributors.length; i++) {
            token.mint(contributors[i], balances[i]);
        }
        return true;
    }
}
