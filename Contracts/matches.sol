pragma solidity ^0.4.24;

contract Tokens {
    
    address owner;
    uint priceOfTokens = 0.001 ether;
    
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
        uint256 numTokens = msg.value / priceOfTokens;
        accounts[msg.sender] += numTokens;
    }
    
    function getTokens(address _userAddress) public view returns(uint _balance){
        _balance = accounts[_userAddress];
    }
}

contract Matches is Tokens {
    
    struct Match {
        string matchLink;
        string teamA;
        string teamB;
        uint8 winner;
    }
    
    Match[] public matches;
    
    mapping (string => uint) internal matchIndex;
    
    function addMatch(string _matchLink, string _teamA, string _teamB) public onlyOwner {
        uint id = matches.push(Match(_matchLink, _teamA, _teamB, 0)) - 1;
        matchIndex[_matchLink] = id;
    }
    
    function getAllMatches() external view returns(uint[] memory result) {
        result = new uint[](matches.length);
        for (uint i = 0; i < matches.length; i++) {
            result[i] = i;
        }
    }
    
    function setWinner(uint8 _winner, string _matchLink) internal {
        matches[matchIndex[_matchLink]].winner = _winner;
    }
    
}

contract Bet is Matches {
    
    struct Bets {
        address betterAddress;
        string matchLink;
        uint8 teamBetted;
        uint tokensBetted;
        uint8 status;
    }
    
    Bets[] public betList;
    
    function betOnTeam(address _betterAddress, string _matchLink, uint8 _team,  uint _tokens) public {
        betList.push(Bets(_betterAddress, _matchLink, _team, _tokens, 0));
        accounts[_betterAddress] -= _tokens;
    }
    
    function getUserBets(address _address) view external returns(uint[] result) {
        result = new uint[](betList.length);
        for (uint i = 0; i < betList.length; i++) {
            if (betList[i].betterAddress == _address) {
                result[i] = i;
            }
        }
    }
    
    function updateBetsDistributePrize(uint8 _winner, string _matchLink) internal {
        for (uint i = 0; i < betList.length; i++) {
            Bets storage bet = betList[i];

            if (keccak256(abi.encodePacked(bet.matchLink)) == keccak256(abi.encodePacked(_matchLink))) {
                
                if (bet.teamBetted == _winner) {
                    accounts[bet.betterAddress] += bet.tokensBetted * 2;
                    bet.status = 1;
                }
                else {
                    bet.status = 2;
                }
                
                
            }
            
        }
    }
    
    function betConclude(string _matchLink, uint8 _winner) public onlyOwner {
        setWinner(_winner, _matchLink);
        updateBetsDistributePrize(_winner, _matchLink);
    }
    
}