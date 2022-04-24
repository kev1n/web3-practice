const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy(
    {value: hre.ethers.utils.parseEther("0.05")}
  );
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  /**
   * Let's send a few waves!
   */
   let waveTxn = await waveContract.wave("A message!");
   await waveTxn.wait(); // Wait for the transaction to be mined
 
   waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
   await waveTxn.wait(); // Wait for the transaction to be mined
 
   let allWaves = await waveContract.getOwedFromAddress(randomPerson.address);
   console.log(allWaves);

   let allWaves2 = await waveContract.getOwedFromAddress(owner.address);
   console.log(allWaves2);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();