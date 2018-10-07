pragma solidity ^0.4.24;

contract Tokens {
    
    address owner;
    uint priceOfTokens = 0.01 ether;
    
    constructor() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    mapping (address => uint) public accounts;
    
    function getTokenPrice() view public returns(uint _price) {
        _price = priceOfTokens;
    }
    
    function setTokenPrice(uint _newPrice) public onlyOwner {
        priceOfTokens = _newPrice;
    }
    
    function buyTokens() public payable {
        accounts[msg.sender] += msg.value / priceOfTokens;
    }
    
    function getTokens() public view returns(uint _balance){
        _balance = accounts[msg.sender];
    }
}