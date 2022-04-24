const main = async () => {
    const Chat = hre.ethers.getContractFactory("Chat");
    const chat = await Chat.deploy();

    console.log("Chat deployed to:", chat.address());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});