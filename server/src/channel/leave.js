import { ajv, logger, userRoom } from "../util.js";

const validate = ajv.compile({
  type: "object",
  properties: {
    channelId: { type: "string", format: "uuid" },
  },
  required: ["channelId"],
  additionalProperties: false,
});

export function leaveChannel({ io, socket, db }) {
  return async (payload, callback) => {
    if (typeof callback !== "function") {
      console.error('leaveChannel missing callback')
      return;
    }

    if (!validate(payload)) {
      return callback({
        status: "ERROR",
        errors: validate.errors,
      });
    }

    let channel;

    try {
      console.log(['try leave Channel', socket.userId, payload.channelId])
      channel = await db.leaveChannel(socket.userId, payload.channelId);
      console.log(['leaveChannel', channel])
    } catch (e) {
      console.log(e)
      return callback({
        status: "ERROR",
      });
    }

    logger.info("user [%s] has left channel [%s]", socket.userId, payload.channelId);

    // broadcast to the other tabs of the same user
    socket.to(userRoom(socket.userId)).emit("channel:left", payload.channelId);

    //io.in(userRoom(socket.userId)).socketsLeave(`channel:${channel.id}`);

    callback({
      status: "OK",
      data: channel,
    });
  };
}
