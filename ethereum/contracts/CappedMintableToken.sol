pragma solidity >=0.4.22 <0.6.0;
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";

contract CappedMintableToken is ERC20Mintable {
    uint256 private cap;

    constructor(uint256 _cap) public {
        require(_cap > 0, "cap amount must be higher than 0");
        cap = _cap;
    }

    function getCap() public view returns(uint256) {
        return cap;
    }

    function mint( address _to, uint256 _amount ) public onlyMinter returns (bool) {
        require(totalSupply() + _amount <= cap, "The amount entered would exceed the cap of the token");

        return super.mint(_to, _amount);
    }
}
