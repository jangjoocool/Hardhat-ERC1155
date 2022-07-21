import { ethers, waffle } from 'hardhat';
import { expect } from "chai";
import { deployContract } from 'ethereum-waffle';

import PolygonERC1155Arifact from '../artifacts/contracts/PolygonERC1155.sol/PolygonERC1155.json';
import { PolygonERC1155 } from '../typechain-types/contracts/PolygonERC1155';

describe("PolygonERC1155", async () => {
    let contract: PolygonERC1155;

    const provider = waffle.provider;
    const [ADMIN, USER] = provider.getWallets();
    const ADMIN_ADDRESS = await ADMIN.getAddress();
    const USER_ADDRESS = await USER.getAddress();

    const GOLD = 0;
    const SILVER = 1;
    const BRONZE = 2;
    const DIAMOND = 3;
    const TEST_TOKEN = 4;

    const GOLD_AMOUNT = ethers.utils.parseUnits("1", "18");
    const SILVER_AMOUNT = ethers.utils.parseUnits("1", "27");
    const BRONZE_AMOUNT = ethers.utils.parseUnits("1", "30");
    const DIAMOND_AMOUNT = 1;
    const TEST_TOKEN_AMOUNT = 1;

    beforeEach(async () => {
        contract = await deployContract(
            ADMIN,
            PolygonERC1155Arifact
        ) as PolygonERC1155

    });

    context('Deploy', async () => {
        it('token balance', async () => {
            expect(await contract.balanceOf(ADMIN_ADDRESS, GOLD)).to.be.equal(GOLD_AMOUNT);
            expect(await contract.balanceOf(ADMIN_ADDRESS, SILVER)).to.be.equal(SILVER_AMOUNT);
            expect(await contract.balanceOf(ADMIN_ADDRESS, BRONZE)).to.be.equal(BRONZE_AMOUNT);
            expect(await contract.balanceOf(ADMIN_ADDRESS, DIAMOND)).to.be.equal(DIAMOND_AMOUNT);
        });
    })

    context('Mint & Burn', async () => {
        it('new minting', async () => {
            await contract.connect(ADMIN).mint(ADMIN_ADDRESS, TEST_TOKEN, TEST_TOKEN_AMOUNT);
            expect(await contract.balanceOf(ADMIN_ADDRESS, TEST_TOKEN)).to.be.equal(TEST_TOKEN_AMOUNT);
        });

        it('burning🔥', async () => {
            await contract.connect(ADMIN).mint(ADMIN_ADDRESS, TEST_TOKEN, TEST_TOKEN_AMOUNT);
            await contract.connect(ADMIN).burn(TEST_TOKEN, TEST_TOKEN_AMOUNT);
            expect(await contract.balanceOf(ADMIN_ADDRESS, TEST_TOKEN)).to.be.equal(0);
        });
    })

    context('Transfer', async () => {
        it('safeTransferFrom', async () => {
            await contract.connect(ADMIN).safeTransferFrom(ADMIN_ADDRESS, USER_ADDRESS, GOLD, GOLD_AMOUNT, []);
            expect(await contract.balanceOf(ADMIN_ADDRESS, GOLD)).to.be.equal(0)
            expect(await contract.balanceOf(USER_ADDRESS, GOLD)).to.be.equal(GOLD_AMOUNT);
        });
    })

});