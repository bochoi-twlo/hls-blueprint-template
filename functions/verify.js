const { getParam } = require(Runtime.getFunctions()["helpers"].path);
const { parsePhoneNumber } = require("awesome-phonenumber");

/**
 * An endpoint to activate Twilio's Verify flow. To initiate a verification, provide phoneNumber to send a code to.
 * To check a verification, provide  phoneNumber and code.
 */
exports.handler = async (context, event, callback) => {
  const response = new Twilio.Response();
  response.appendHeader("Content-Type", "application/json");
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.setStatusCode(200);

  try {
    const verifySid = await getParam(context, "VERIFY_SID");
    const client = context.getTwilioClient();

    //#region Validation checks
    if (!event.phoneNumber) {
      response.setBody({
        error: true,
        errorObject: "phoneNumber was not provided in the POST body.",
      });
      response.setStatusCode(400);
      return callback(null, response);
    }
    const pn = parsePhoneNumber(event.phoneNumber, "US");
    if (!pn.isValid()) {
      response.setBody({
        error: true,
        errorObject: "the phoneNumber provided was not valid.",
      });
      response.setStatusCode(400);
      return callback(null, response);
    }
    //#endregion end validation checks

    if (!event.code) {
      //assumes initiation of Verify flow
      //initiate verification
      const res = await client.verify.v2
        .services(verifySid)
        .verifications.create({ to: pn.getNumber(), channel: "sms" });

      response.setBody({ error: false, result: res.sid });
    } else {
      //assumes we are checking a verification since a code is being provided
      const res = await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: pn.getNumber(), code: event.code })
        .then((resp) =>
          resp.status === "approved"
            ? { error: false }
            : {
                error: true,
                errorObject: "Did not receive 'approved' status from Verify.",
              }
        );

      response.setBody(res);
      if (res.error) {
        response.setStatusCode(400);
      }
    }
  } catch (err) {
    console.error(err);
    response.setStatusCode(500);
    response.setBody({ error: true, errorObject: "Server Error." });
  }

  return callback(null, response);
};
