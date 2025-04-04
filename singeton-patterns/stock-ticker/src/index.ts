import PubSubManager from "./managers/pub-sub_manager";

const main = async () => {
  try {
    const instance = await PubSubManager.getInstance();

    // Subscribe to the 'apple' channel
    await instance.userSubscribe({
      channel: "apple",
      userId: "1",
    });

    // Additional subscribers for demonstration
    await instance.userSubscribe({
      channel: "apple",
      userId: "2",
    });

    // First stock price update after 2 seconds
    setTimeout(async () => {
      await instance.publishData({
        channel: "apple",
        content: {
          symbol: "APP",
          price: "$123.34",
          inc: "+2%",
          day: 1,
        },
      });
    }, 2000);

    // Second stock price update after 3 seconds
    setTimeout(async () => {
      await instance.publishData({
        channel: "apple",
        content: {
          symbol: "APP",
          price: "$120.34",
          inc: "-2%",
          day: 2,
        },
      });
    }, 3000);
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

main();
