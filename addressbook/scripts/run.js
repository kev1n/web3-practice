const main = async () => {
    const [deployer, rand, rand2] = await hre.ethers.getSigners();

    const AddressBookFactory = await hre.ethers.getContractFactory("AddressBook");
    const addressBook = await AddressBookFactory.deploy();
    await addressBook.deployed();

    console.log("Contract deployed to:", addressBook.address);
    console.log("Contract deployed by", deployer.address);

    
    await addressBook.addAddress(rand2.address, "second buddy");
    console.log(await addressBook.getAlias(rand2.address))

    await addressBook.addAddress(rand.address, "my buddy");
    let ary = await addressBook.getAddressArray(deployer.address);
    console.log(ary);


    await addressBook.removeAddress(rand.address);
    ary = await addressBook.getAddressArray(deployer.address);
    console.log(ary);
    console.log(rand.address, " removed");


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});