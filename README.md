# solidity_profiler
profile solidity functions

Almost same as EricR's [sol-function-profiler](https://github.com/EricR/sol-function-profiler).

Differences:
1. change `solidity-parser` to `solidity-parser-antlr` which can handle `constructor`
2. add class inheritance


Example Output:
```
node ./sol.js  ../solidity/Conference.sol 
.-------------------------------------------------------------------------------------------------------------------------------------------.
|                                                        ../solidity/Conference.sol                                                         |
|-------------------------------------------------------------------------------------------------------------------------------------------|
|  Contract  |                   Function Proto                   | Selector | Visibility | StateMut | Returns |         Modifiers          |
|------------|----------------------------------------------------|----------|------------|----------|---------|----------------------------|
| Conference |                                                    |          |            |          |         | is Destructible,GroupAdmin |
| Conference | constructor(string,uint256,uint256,uint256,string) |          | public     |          | null    |                            |
| Conference | registerWithEncryption(string,string)              | 5d27bff3 | external   | payable  | null    | onlyActive                 |
| Conference | register(string)                                   | f2c298be | external   | payable  | null    | onlyActive                 |
| Conference | registerInternal(string)                           | 49f2a049 | internal   |          | null    |                            |
| Conference | withdraw()                                         | 3ccfd60b | external   |          | null    | onlyEnded                  |
| Conference | totalBalance()                                     | ad7a672f | public     | view     | uint256 |                            |
| Conference | isRegistered(address)                              | c3c5a547 | public     | view     | bool    |                            |
| Conference | isAttended(address)                                | a07f3a56 | public     | view     | bool    |                            |
| Conference | isPaid(address)                                    | 6ded82f8 | public     | view     | bool    |                            |
| Conference | payout()                                           | 63bd1d4a | public     | view     | uint256 |                            |
| Conference | payback()                                          | 854bec87 | external   |          | null    | onlyOwner,onlyActive       |
| Conference | cancel()                                           | ea8a1af0 | external   |          | null    | onlyOwner,onlyActive       |
| Conference | clear()                                            | 52efea6e | external   |          | null    | onlyOwner,onlyEnded        |
| Conference | setLimitOfParticipants(uint256)                    | 9989a5ae | external   |          | null    | onlyOwner,onlyActive       |
| Conference | changeName(string)                                 | 5353a2d8 | external   |          | null    | onlyOwner,noOneRegistered  |
| Conference | attend(address[])                                  | 982495c7 | external   |          | null    | onlyAdmin,onlyActive       |
'-------------------------------------------------------------------------------------------------------------------------------------------'
```
