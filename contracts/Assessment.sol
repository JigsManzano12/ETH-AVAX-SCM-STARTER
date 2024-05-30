// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    //Gerard
    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }
    //Gerard
    function deposit(uint256 _amount) public payable {
        uint256 previousBalance = balance;
        require(msg.sender == owner, "You are not the owner of this account");

        balance += _amount;
        assert(balance == previousBalance + _amount);

        // Emit the event
        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance(balance, _withdrawAmount);
        }
        balance -= _withdrawAmount;

        assert(balance == (previousBalance - _withdrawAmount));

        emit Withdraw(_withdrawAmount);
    }
}
    //Gerard
