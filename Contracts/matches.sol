pragma solidity ^0.4.24;

import "./tokens.sol";

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
    
    function setWinner(uint8 _winner, string _matchLink) public onlyOwner {
        matches[matchIndex[_matchLink]].winner = _winner;
    }
    
}