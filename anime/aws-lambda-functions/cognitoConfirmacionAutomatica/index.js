exports.handler = function (event, context) {
    // This Lambda function returns a flag to indicate if a user should be auto-confirmed.
    console.log(event);
    event.response.autoConfirmUser = true;
    // Return result to Cognito
    context.done(null, event);
};