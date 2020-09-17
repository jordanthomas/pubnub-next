import PubNub from "pubnub";
import { NextApiRequest, NextApiResponse } from "next";

const pubnub = new PubNub({
  subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY || "",
  publishKey: process.env.PUBNUB_PUBLISH_KEY,
});

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const { channel, notification } = request.body;

    await pubnub.publish({
      channel,
      message: notification,
    });

    response.status(200).json({ status: "Sent!" });
  } catch (err) {
    response.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
