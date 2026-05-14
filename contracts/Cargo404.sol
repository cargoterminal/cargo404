// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title Cargo404 ($C404)
/// @notice Fixed-supply BNB Chain mint token with hardcoded fair-launch limits.
contract Cargo404 is ERC20, Ownable, Pausable, ReentrancyGuard {
    uint256 public constant TOTAL_SUPPLY = 40_400_000 ether;
    uint256 public constant MINT_ALLOCATION = 28_280_000 ether;
    uint256 public constant RESERVE_ALLOCATION = 12_120_000 ether;

    uint256 public constant MINT_PRICE = 0.0025 ether;
    uint256 public constant TOKENS_PER_MINT = 4_040 ether;
    uint256 public constant MAX_MINTS = 7_000;
    uint256 public constant MAX_PER_WALLET = 10;

    uint16 public constant LIQUIDITY_BPS = 7_000; // 70%
    uint16 public constant TREASURY_BPS = 2_000; // 20%
    uint16 public constant BUYBACK_BPS = 1_000; // 10%
    uint16 public constant BPS_DENOMINATOR = 10_000;

    address public immutable treasury;
    address public immutable buybackWallet;

    uint256 public totalMintUnits;
    bool public mintActive;
    bool public distributed;

    mapping(address => uint256) public mintedUnitsByWallet;

    event MintStatusChanged(bool active);
    event CargoLoaded(address indexed wallet, uint256 units, uint256 tokens, uint256 paid);
    event RaisedBnbDistributed(uint256 liquidityAmount, uint256 treasuryAmount, uint256 buybackAmount);

    error MintClosed();
    error InvalidUnits();
    error MaxMintExceeded();
    error MaxWalletExceeded();
    error IncorrectPayment();
    error AlreadyDistributed();
    error TransferFailed();
    error ZeroAddress();

    constructor(address treasury_, address buybackWallet_) ERC20("Cargo404", "C404") Ownable(msg.sender) {
        if (treasury_ == address(0) || buybackWallet_ == address(0)) revert ZeroAddress();
        treasury = treasury_;
        buybackWallet = buybackWallet_;

        _mint(address(this), MINT_ALLOCATION);
        _mint(msg.sender, RESERVE_ALLOCATION);
    }

    function mintCargo(uint256 units) external payable whenNotPaused nonReentrant {
        if (!mintActive) revert MintClosed();
        if (units == 0) revert InvalidUnits();
        if (totalMintUnits + units > MAX_MINTS) revert MaxMintExceeded();
        if (mintedUnitsByWallet[msg.sender] + units > MAX_PER_WALLET) revert MaxWalletExceeded();

        uint256 cost = MINT_PRICE * units;
        if (msg.value != cost) revert IncorrectPayment();

        uint256 tokenAmount = TOKENS_PER_MINT * units;
        mintedUnitsByWallet[msg.sender] += units;
        totalMintUnits += units;

        _transfer(address(this), msg.sender, tokenAmount);
        emit CargoLoaded(msg.sender, units, tokenAmount, cost);
    }

    function setMintActive(bool active) external onlyOwner {
        mintActive = active;
        emit MintStatusChanged(active);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    /// @notice Splits raised BNB by hardcoded percentages.
    /// @dev Liquidity share is sent to owner/deployer so they can pair with reserve tokens and burn/lock LP.
    function distributeRaisedBnb() external onlyOwner nonReentrant {
        if (distributed) revert AlreadyDistributed();
        distributed = true;

        uint256 balance = address(this).balance;
        uint256 liquidityAmount = (balance * LIQUIDITY_BPS) / BPS_DENOMINATOR;
        uint256 treasuryAmount = (balance * TREASURY_BPS) / BPS_DENOMINATOR;
        uint256 buybackAmount = balance - liquidityAmount - treasuryAmount;

        _safeSend(owner(), liquidityAmount);
        _safeSend(treasury, treasuryAmount);
        _safeSend(buybackWallet, buybackAmount);

        emit RaisedBnbDistributed(liquidityAmount, treasuryAmount, buybackAmount);
    }

    function remainingMintUnits() external view returns (uint256) {
        return MAX_MINTS - totalMintUnits;
    }

    function walletRemainingMintUnits(address wallet) external view returns (uint256) {
        return MAX_PER_WALLET - mintedUnitsByWallet[wallet];
    }

    function _safeSend(address to, uint256 amount) internal {
        if (amount == 0) return;
        (bool ok, ) = to.call{value: amount}("");
        if (!ok) revert TransferFailed();
    }
}
