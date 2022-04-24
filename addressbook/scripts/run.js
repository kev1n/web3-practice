const main = async () => {
    const [deployer, rand] = await hre.ethers.getSigners();

    const AddressBookFactory = await hre.ethers.getContractFactory("AddressBook");
    const addressBook = await AddressBookFactory.deploy();
    await addressBook.deployed();

    console.log("Contract deployed to:", addressBook.address);
    console.log("Contract deployed by", deployer.address);


    console.log(deployer.address, rand.address);

    await addressBook.addAddress(deployer.address, rand.address, "my buddy");

    const ary = await addressBook.getAddressArray(deployer.address);

    console.log(ary);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});