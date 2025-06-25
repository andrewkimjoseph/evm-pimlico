// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract SimpleAccount is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    address public paymentAddress;
    uint256 public totalWithdrawals;

    event TokenWithdrawn(address token, uint256 amount);
    event PaymentAddressUpdated(address newAddress);
    event SimpleAccountCreated(address simpleAccount);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _owner, address _paymentAddress)
        public
        initializer
    {
        require(_paymentAddress != address(0), "Invalid payment address");

        __Ownable_init(_owner);
        __UUPSUpgradeable_init();

        paymentAddress = _paymentAddress;

        emit SimpleAccountCreated(address(this));
    }

    function withdrawToken(address token, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero");

        ERC20Upgradeable tokenContract = ERC20Upgradeable(token);
        require(
            tokenContract.balanceOf(address(this)) >= amount,
            "Insufficient balance"
        );

        bool success = tokenContract.transfer(paymentAddress, amount);
        require(success, "Transfer failed");

        totalWithdrawals += amount;
        emit TokenWithdrawn(token, amount);
    }

    function updatePaymentAddress(address newAddress) external onlyOwner {
        require(newAddress != address(0), "Invalid address");
        paymentAddress = newAddress;
        emit PaymentAddressUpdated(newAddress);
    }

    function getTokenBalance(address token) external view returns (uint256) {
        return ERC20Upgradeable(token).balanceOf(address(this));
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}

    uint256[50] private __gap;
}
