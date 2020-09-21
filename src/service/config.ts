export const levelPrice:number = 5;
export const useCoin:string = "SERO";

export const address:string = "2ee89LvAjirWDUVyftZFNjwEr8GXwkV2opPEJXCysYWXrTWkmQFS8uWjC8utDZFLy9qkboU9VhbNg6uTukyQMXm3"

export const abi:any = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "userAddress",
                "type": "address"
            },
            {
                "name": "level",
                "type": "uint8"
            }
        ],
        "name": "usersActiveX3Levels",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "reward",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "LAST_LEVEL",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
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
        "name": "idToAddress",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "info",
        "outputs": [
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "referrer",
                "type": "uint256"
            },
            {
                "name": "partnersCount",
                "type": "uint256"
            },
            {
                "name": "x3Income",
                "type": "uint256"
            },
            {
                "name": "x6Income",
                "type": "uint256"
            },
            {
                "name": "activeS3Levels",
                "type": "bool[]"
            },
            {
                "name": "activeS6Levels",
                "type": "bool[]"
            },
            {
                "name": "latestShareDayR",
                "type": "uint256"
            },
            {
                "name": "latestShareAmountR",
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
                "name": "user",
                "type": "address"
            }
        ],
        "name": "isUserExists",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "detail",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "balanceOf",
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
        "constant": false,
        "inputs": [
            {
                "name": "referrerAddress",
                "type": "address"
            }
        ],
        "name": "registrationExt",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "userAddress",
                "type": "address"
            },
            {
                "name": "level",
                "type": "uint8"
            }
        ],
        "name": "usersX3Matrix",
        "outputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address[]"
            },
            {
                "name": "",
                "type": "bool"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "bool"
            },
            {
                "name": "",
                "type": "uint8[]"
            },
            {
                "name": "",
                "type": "uint8[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
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
                "name": "x",
                "type": "bytes32"
            }
        ],
        "name": "bytes32ToString",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "userAddress",
                "type": "address"
            },
            {
                "name": "level",
                "type": "uint8"
            }
        ],
        "name": "usersX6Matrix",
        "outputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "address[]"
            },
            {
                "name": "",
                "type": "address[]"
            },
            {
                "name": "",
                "type": "bool"
            },
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "bool"
            },
            {
                "name": "",
                "type": "uint8[]"
            },
            {
                "name": "",
                "type": "uint8[]"
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
                "type": "address"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "referrer",
                "type": "address"
            },
            {
                "name": "partnersCount",
                "type": "uint256"
            },
            {
                "name": "x3Income",
                "type": "uint256"
            },
            {
                "name": "x6Income",
                "type": "uint256"
            },
            {
                "name": "latestWithdrawTime",
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
                "name": "userAddress",
                "type": "address"
            },
            {
                "name": "level",
                "type": "uint8"
            }
        ],
        "name": "usersActiveX6Levels",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "matrix",
                "type": "uint8"
            },
            {
                "name": "level",
                "type": "uint8"
            }
        ],
        "name": "buyNewLevel",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "userAddress",
                "type": "address"
            },
            {
                "name": "level",
                "type": "uint8"
            }
        ],
        "name": "findFreeX6Referrer",
        "outputs": [
            {
                "name": "",
                "type": "address"
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
                "type": "uint8"
            }
        ],
        "name": "levelPrice",
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
                "name": "userAddress",
                "type": "address"
            },
            {
                "name": "level",
                "type": "uint8"
            }
        ],
        "name": "findFreeX3Referrer",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "ownerAddress",
                "type": "address"
            },
            {
                "name": "currency",
                "type": "string"
            },
            {
                "name": "addr1",
                "type": "address"
            },
            {
                "name": "addr2",
                "type": "address"
            },
            {
                "name": "addr3",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
];
