// redis can act as a pub sub modal
// subs -> redis
// pubs -> redis
// redis -> subs

import PubSubManager from "./managers/pub-sub_manager";

const main = async () => {
  try {
    const instance = await PubSubManager.getInstance();
    await instance.userSubscribe({
      channel: "apple",
      userId: "1",
    });

    // Delay before publishing to ensure subscription is active
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

    // Delay before publishing to ensure subscription is active
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
    console.log("error: ", error);
  }
};

main();
