export const SEND_MESSAGE = "SEND_MESSAGE";

export const sendMessage = (message) => {
 console.log("message in action ", message);

  return { type: SEND_MESSAGE, message: message };
};
