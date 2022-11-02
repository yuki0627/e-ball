const fs = require("fs");
const SINGLE_BALLS = require("../constantSingleBalls.js");

const main = async () => {
    addressList = [];
    NFT_COUNT = 5; // 0~ ボールの種類ごと、いくつNFTをmintしておくか

    // デプロイ
    for (i = 0; i < singleBalls.length; i++){
        BallContractFactory = await ethers.getContractFactory("Ball");
        ballContract = await BallContractFactory.deploy(`TEST-D-BALL-${i+1}`, `TDB${i+1}`, SINGLE_BALLS[i]);
        await ballContract.deployed();
        console.log(`ballContract${i} deployed to: https://goerli.etherscan.io/address/${ballContract.address}`);
        addressList.push(ballContract.address);
        for (n = 0; n < NFT_COUNT; n++){
            tx = await ballContract.mint(`D-BALL-${i + 1}`, `${n + 1}/${NFT_COUNT}`);
            await tx.wait(); //TODO: 必要？
            console.log('NFT minted:', `BALL-${i + 1}: NFT-${n + 1}`);
        }
    }
    // TODO: コントラクトアドレスの書き出し
    console.log('addressList:', addressList);
};

const deploy = async () => { 
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

deploy();