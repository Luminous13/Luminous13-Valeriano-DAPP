var Ezbet_Address = "0x8511f24139240bd3b743cd92bcd8dba1ef7fd3f6";

var ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_matchLink",
				"type": "string"
			},
			{
				"name": "_teamA",
				"type": "string"
			},
			{
				"name": "_teamB",
				"type": "string"
			}
		],
		"name": "addMatch",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_matchLink",
				"type": "string"
			},
			{
				"name": "_winner",
				"type": "uint8"
			}
		],
		"name": "betConclude",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_betterAddress",
				"type": "address"
			},
			{
				"name": "_matchLink",
				"type": "string"
			},
			{
				"name": "_team",
				"type": "uint8"
			},
			{
				"name": "_tokens",
				"type": "uint256"
			}
		],
		"name": "betOnTeam",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_numTokens",
				"type": "uint256"
			}
		],
		"name": "buyTokens",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newPrice",
				"type": "uint256"
			}
		],
		"name": "setTokenPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "accounts",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "betList",
		"outputs": [
			{
				"name": "betterAddress",
				"type": "address"
			},
			{
				"name": "matchLink",
				"type": "string"
			},
			{
				"name": "teamBetted",
				"type": "uint8"
			},
			{
				"name": "tokensBetted",
				"type": "uint256"
			},
			{
				"name": "status",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllMatches",
		"outputs": [
			{
				"name": "result",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTokenPrice",
		"outputs": [
			{
				"name": "_price",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getTokens",
		"outputs": [
			{
				"name": "_balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getUserBets",
		"outputs": [
			{
				"name": "result",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "matches",
		"outputs": [
			{
				"name": "matchLink",
				"type": "string"
			},
			{
				"name": "teamA",
				"type": "string"
			},
			{
				"name": "teamB",
				"type": "string"
			},
			{
				"name": "winner",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];