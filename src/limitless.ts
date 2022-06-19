export type Limitless = {
  "version": "0.1.0",
  "name": "limitless",
  "instructions": [
    {
      "name": "initializeTracker",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeMarket",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketTracker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "params",
          "type": {
            "defined": "InitParams"
          }
        }
      ]
    },
    {
      "name": "claimPremint",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "creatorMint",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quantity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "BuyParams"
          }
        }
      ]
    },
    {
      "name": "sell",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SellParams"
          }
        }
      ]
    },
    {
      "name": "transferFees",
      "accounts": [
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "toMarketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toQuoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromMarketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromPlatformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateLaunchDate",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newDate",
          "type": "i64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "marketState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseMintAddress",
            "type": "publicKey"
          },
          {
            "name": "baseMintTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintFloorTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "platformFeeVaultAddress",
            "type": "publicKey"
          },
          {
            "name": "maxCqd",
            "type": "u64"
          },
          {
            "name": "cqd",
            "type": "u64"
          },
          {
            "name": "askOffset",
            "type": "u64"
          },
          {
            "name": "bidOffset",
            "type": "u64"
          },
          {
            "name": "spread",
            "type": "u64"
          },
          {
            "name": "minSize",
            "type": "u64"
          },
          {
            "name": "gradient",
            "type": "u64"
          },
          {
            "name": "askPrice",
            "type": "u64"
          },
          {
            "name": "bidPrice",
            "type": "u64"
          },
          {
            "name": "baseDecimals",
            "type": "u8"
          },
          {
            "name": "quoteDecimals",
            "type": "u8"
          },
          {
            "name": "floorPrice",
            "type": "u64"
          },
          {
            "name": "floorQuantityC",
            "type": "u64"
          },
          {
            "name": "floorQuantityB",
            "type": "u64"
          },
          {
            "name": "floorQuantity",
            "type": "u64"
          },
          {
            "name": "highestFloorQuantity",
            "type": "u64"
          },
          {
            "name": "totalMoved",
            "type": "u64"
          },
          {
            "name": "floorPoolSize",
            "type": "u64"
          },
          {
            "name": "basePoolSize",
            "type": "u64"
          },
          {
            "name": "quotePoolSize",
            "type": "u64"
          },
          {
            "name": "startQ",
            "type": "u64"
          },
          {
            "name": "totalSoldBase",
            "type": "u128"
          },
          {
            "name": "totalSoldQuote",
            "type": "u128"
          },
          {
            "name": "totalBoughtBase",
            "type": "u128"
          },
          {
            "name": "totalBoughtQuote",
            "type": "u128"
          },
          {
            "name": "totalSells",
            "type": "u128"
          },
          {
            "name": "totalBuys",
            "type": "u128"
          },
          {
            "name": "totalMinted",
            "type": "u64"
          },
          {
            "name": "totalBurned",
            "type": "u64"
          },
          {
            "name": "totalBurnCost",
            "type": "u64"
          },
          {
            "name": "marketStateBump",
            "type": "u8"
          },
          {
            "name": "baseMintBump",
            "type": "u8"
          },
          {
            "name": "baseTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "quoteTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "quoteTokenFloorVaultBump",
            "type": "u8"
          },
          {
            "name": "platformFeeVaultBump",
            "type": "u8"
          },
          {
            "name": "id",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "latestTradeBuy",
            "type": "bool"
          },
          {
            "name": "latestTradeQuantity",
            "type": "u64"
          },
          {
            "name": "latestTradeCost",
            "type": "u64"
          },
          {
            "name": "latestTradeTs",
            "type": "i64"
          },
          {
            "name": "latestTradeWallet",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "launchDate",
            "type": "i64"
          },
          {
            "name": "preMint",
            "type": "u64"
          },
          {
            "name": "preMintClaimed",
            "type": "bool"
          },
          {
            "name": "continuousMint",
            "type": "bool"
          },
          {
            "name": "creatorMinted",
            "type": "u64"
          },
          {
            "name": "buyFee",
            "type": "u32"
          },
          {
            "name": "sellFee",
            "type": "u32"
          },
          {
            "name": "receiveAddress",
            "type": "publicKey"
          },
          {
            "name": "platformFee",
            "type": "u32"
          },
          {
            "name": "index",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "marketTrackerBase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "trackerBump",
            "type": "u8"
          },
          {
            "name": "id",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "marketTracker",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketKey",
            "type": "publicKey"
          },
          {
            "name": "id",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "marketTrackerBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startQuantity",
            "type": "u64"
          },
          {
            "name": "askOffset",
            "type": "u64"
          },
          {
            "name": "bidOffset",
            "type": "u64"
          },
          {
            "name": "minTradeSize",
            "type": "u64"
          },
          {
            "name": "gradient",
            "type": "u64"
          },
          {
            "name": "preMint",
            "type": "u64"
          },
          {
            "name": "continuousMint",
            "type": "bool"
          },
          {
            "name": "buyFee",
            "type": "u32"
          },
          {
            "name": "sellFee",
            "type": "u32"
          },
          {
            "name": "launchDate",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "BuyParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "maxCost",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SellParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "minProceeds",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MarketAlreadyLaunched",
      "msg": "Market already launched!"
    },
    {
      "code": 6001,
      "name": "InvalidIdLength",
      "msg": "Invalid id length!"
    },
    {
      "code": 6002,
      "name": "InsufficientFloorLiquidity",
      "msg": "Insufficient floor liquidity!"
    },
    {
      "code": 6003,
      "name": "InvalidCreator",
      "msg": "Invalid creator!"
    },
    {
      "code": 6004,
      "name": "NotAvailable",
      "msg": "Not available!"
    },
    {
      "code": 6005,
      "name": "InvalidQuoteMint",
      "msg": "Invalid quote mint!"
    },
    {
      "code": 6006,
      "name": "AlreadyClaimed",
      "msg": "Premint already claimed!"
    },
    {
      "code": 6007,
      "name": "InvalidFee",
      "msg": "Invalid fee!"
    },
    {
      "code": 6008,
      "name": "InsuficcientBase",
      "msg": "Insufficient base liquidity!"
    },
    {
      "code": 6009,
      "name": "BaseAndQuoteMatch",
      "msg": "Base and quote address match!"
    },
    {
      "code": 6010,
      "name": "TickAndSizeCombo",
      "msg": "Tick and size error!"
    },
    {
      "code": 6011,
      "name": "SlippageLimitHit",
      "msg": "Slippage Limit Hit!"
    },
    {
      "code": 6012,
      "name": "InvalidQuantity",
      "msg": "Invalid quantity!"
    },
    {
      "code": 6013,
      "name": "InvalidMaxCost",
      "msg": "Invalid max cost!"
    },
    {
      "code": 6014,
      "name": "InvalidStartPrice",
      "msg": "Invalid start price!"
    },
    {
      "code": 6015,
      "name": "InvalidPriceTick",
      "msg": "Invalid price tick!"
    },
    {
      "code": 6016,
      "name": "InvalidMinimumTradeSize",
      "msg": "Invalid minimum trade size!"
    },
    {
      "code": 6017,
      "name": "InvalidOrderSize",
      "msg": "Invalid order size!"
    },
    {
      "code": 6018,
      "name": "ArithmeticError",
      "msg": "Arithmetic Error"
    },
    {
      "code": 6019,
      "name": "OverflowError",
      "msg": "Overflow"
    },
    {
      "code": 6020,
      "name": "UnderflowError",
      "msg": "Underflow"
    }
  ]
};

export const IDL: Limitless = {
  "version": "0.1.0",
  "name": "limitless",
  "instructions": [
    {
      "name": "initializeTracker",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        }
      ]
    },
    {
      "name": "initializeMarket",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketTracker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "params",
          "type": {
            "defined": "InitParams"
          }
        }
      ]
    },
    {
      "name": "claimPremint",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "creatorMint",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "quantity",
          "type": "u64"
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "BuyParams"
          }
        }
      ]
    },
    {
      "name": "sell",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userBaseToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "baseTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userQuoteToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "quoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "platformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeReceiveAddress",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SellParams"
          }
        }
      ]
    },
    {
      "name": "transferFees",
      "accounts": [
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "toMarketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "toQuoteTokenFloorVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromMarketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "fromPlatformFeeVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateLaunchDate",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "marketTrackerBase",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "marketState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "newDate",
          "type": "i64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "marketState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "baseMintAddress",
            "type": "publicKey"
          },
          {
            "name": "baseMintTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "quoteMintFloorTokenAddress",
            "type": "publicKey"
          },
          {
            "name": "platformFeeVaultAddress",
            "type": "publicKey"
          },
          {
            "name": "maxCqd",
            "type": "u64"
          },
          {
            "name": "cqd",
            "type": "u64"
          },
          {
            "name": "askOffset",
            "type": "u64"
          },
          {
            "name": "bidOffset",
            "type": "u64"
          },
          {
            "name": "spread",
            "type": "u64"
          },
          {
            "name": "minSize",
            "type": "u64"
          },
          {
            "name": "gradient",
            "type": "u64"
          },
          {
            "name": "askPrice",
            "type": "u64"
          },
          {
            "name": "bidPrice",
            "type": "u64"
          },
          {
            "name": "baseDecimals",
            "type": "u8"
          },
          {
            "name": "quoteDecimals",
            "type": "u8"
          },
          {
            "name": "floorPrice",
            "type": "u64"
          },
          {
            "name": "floorQuantityC",
            "type": "u64"
          },
          {
            "name": "floorQuantityB",
            "type": "u64"
          },
          {
            "name": "floorQuantity",
            "type": "u64"
          },
          {
            "name": "highestFloorQuantity",
            "type": "u64"
          },
          {
            "name": "totalMoved",
            "type": "u64"
          },
          {
            "name": "floorPoolSize",
            "type": "u64"
          },
          {
            "name": "basePoolSize",
            "type": "u64"
          },
          {
            "name": "quotePoolSize",
            "type": "u64"
          },
          {
            "name": "startQ",
            "type": "u64"
          },
          {
            "name": "totalSoldBase",
            "type": "u128"
          },
          {
            "name": "totalSoldQuote",
            "type": "u128"
          },
          {
            "name": "totalBoughtBase",
            "type": "u128"
          },
          {
            "name": "totalBoughtQuote",
            "type": "u128"
          },
          {
            "name": "totalSells",
            "type": "u128"
          },
          {
            "name": "totalBuys",
            "type": "u128"
          },
          {
            "name": "totalMinted",
            "type": "u64"
          },
          {
            "name": "totalBurned",
            "type": "u64"
          },
          {
            "name": "totalBurnCost",
            "type": "u64"
          },
          {
            "name": "marketStateBump",
            "type": "u8"
          },
          {
            "name": "baseMintBump",
            "type": "u8"
          },
          {
            "name": "baseTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "quoteTokenVaultBump",
            "type": "u8"
          },
          {
            "name": "quoteTokenFloorVaultBump",
            "type": "u8"
          },
          {
            "name": "platformFeeVaultBump",
            "type": "u8"
          },
          {
            "name": "id",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "latestTradeBuy",
            "type": "bool"
          },
          {
            "name": "latestTradeQuantity",
            "type": "u64"
          },
          {
            "name": "latestTradeCost",
            "type": "u64"
          },
          {
            "name": "latestTradeTs",
            "type": "i64"
          },
          {
            "name": "latestTradeWallet",
            "type": "publicKey"
          },
          {
            "name": "creator",
            "type": "publicKey"
          },
          {
            "name": "launchDate",
            "type": "i64"
          },
          {
            "name": "preMint",
            "type": "u64"
          },
          {
            "name": "preMintClaimed",
            "type": "bool"
          },
          {
            "name": "continuousMint",
            "type": "bool"
          },
          {
            "name": "creatorMinted",
            "type": "u64"
          },
          {
            "name": "buyFee",
            "type": "u32"
          },
          {
            "name": "sellFee",
            "type": "u32"
          },
          {
            "name": "receiveAddress",
            "type": "publicKey"
          },
          {
            "name": "platformFee",
            "type": "u32"
          },
          {
            "name": "index",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "marketTrackerBase",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "trackerBump",
            "type": "u8"
          },
          {
            "name": "id",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "quoteMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "marketTracker",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "marketKey",
            "type": "publicKey"
          },
          {
            "name": "id",
            "type": {
              "array": [
                "u8",
                20
              ]
            }
          },
          {
            "name": "index",
            "type": "u64"
          },
          {
            "name": "marketTrackerBump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "InitParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startQuantity",
            "type": "u64"
          },
          {
            "name": "askOffset",
            "type": "u64"
          },
          {
            "name": "bidOffset",
            "type": "u64"
          },
          {
            "name": "minTradeSize",
            "type": "u64"
          },
          {
            "name": "gradient",
            "type": "u64"
          },
          {
            "name": "preMint",
            "type": "u64"
          },
          {
            "name": "continuousMint",
            "type": "bool"
          },
          {
            "name": "buyFee",
            "type": "u32"
          },
          {
            "name": "sellFee",
            "type": "u32"
          },
          {
            "name": "launchDate",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "BuyParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "maxCost",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SellParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "quantity",
            "type": "u64"
          },
          {
            "name": "minProceeds",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "MarketAlreadyLaunched",
      "msg": "Market already launched!"
    },
    {
      "code": 6001,
      "name": "InvalidIdLength",
      "msg": "Invalid id length!"
    },
    {
      "code": 6002,
      "name": "InsufficientFloorLiquidity",
      "msg": "Insufficient floor liquidity!"
    },
    {
      "code": 6003,
      "name": "InvalidCreator",
      "msg": "Invalid creator!"
    },
    {
      "code": 6004,
      "name": "NotAvailable",
      "msg": "Not available!"
    },
    {
      "code": 6005,
      "name": "InvalidQuoteMint",
      "msg": "Invalid quote mint!"
    },
    {
      "code": 6006,
      "name": "AlreadyClaimed",
      "msg": "Premint already claimed!"
    },
    {
      "code": 6007,
      "name": "InvalidFee",
      "msg": "Invalid fee!"
    },
    {
      "code": 6008,
      "name": "InsuficcientBase",
      "msg": "Insufficient base liquidity!"
    },
    {
      "code": 6009,
      "name": "BaseAndQuoteMatch",
      "msg": "Base and quote address match!"
    },
    {
      "code": 6010,
      "name": "TickAndSizeCombo",
      "msg": "Tick and size error!"
    },
    {
      "code": 6011,
      "name": "SlippageLimitHit",
      "msg": "Slippage Limit Hit!"
    },
    {
      "code": 6012,
      "name": "InvalidQuantity",
      "msg": "Invalid quantity!"
    },
    {
      "code": 6013,
      "name": "InvalidMaxCost",
      "msg": "Invalid max cost!"
    },
    {
      "code": 6014,
      "name": "InvalidStartPrice",
      "msg": "Invalid start price!"
    },
    {
      "code": 6015,
      "name": "InvalidPriceTick",
      "msg": "Invalid price tick!"
    },
    {
      "code": 6016,
      "name": "InvalidMinimumTradeSize",
      "msg": "Invalid minimum trade size!"
    },
    {
      "code": 6017,
      "name": "InvalidOrderSize",
      "msg": "Invalid order size!"
    },
    {
      "code": 6018,
      "name": "ArithmeticError",
      "msg": "Arithmetic Error"
    },
    {
      "code": 6019,
      "name": "OverflowError",
      "msg": "Overflow"
    },
    {
      "code": 6020,
      "name": "UnderflowError",
      "msg": "Underflow"
    }
  ]
};
