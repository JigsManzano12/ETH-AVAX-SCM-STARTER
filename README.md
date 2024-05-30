# Ethereum Smart Contract Assessment

This project, developed by Gerard Jose for Metacrafters, features a basic Ethereum smart contract written in Solidity.

## Features

- Depositing Funds: Users can deposit Ether into the contract.
- Withdrawing Funds: Users can withdraw their deposited Ether from the contract.
- Burning Funds: A specified amount of Ether can be burned, effectively reducing the total supply of Ether.

### Installing Dependencies

- First terminal type: npm i
- second terminal type: npx hardhat node
- third terminal, type: npx hardhat run --network localhost scripts/deploy.js
- Back in the first terminal, type npm run dev to launch the front-end.
- After this, the project will be running on your localhost. Typically at http://localhost:3000/

### Usage Instructions

To use this application, you must follow these steps:

1. Connect your MetaMask wallet: Make sure you have the MetaMask browser extension installed. Connect it to your browser and log in using your credentials.

2. Import your private key: In MetaMask, import your Ethereum account using the private key associated with it. This will allow you to interact with the Ethereum network.

3. Establish your own network: Copy the details of the Hardhat network from your third terminal. In MetaMask, click on the network selection dropdown and choose "Custom RPC". Paste the network details (RPC URL, chain ID, etc.) into the respective fields.

4. Once connected and your network is established, you can interact with the smart contract deployed on your local network through the provided front-end interface.


## Authors

Gerard Manzano
[@Chill Code](https://www.youtube.com/channel/UCqnpVDK-Ym41W1WDvBMmN6w)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

