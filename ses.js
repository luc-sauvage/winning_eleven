const aws = require("aws-sdk");

let secrets;

if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {secrets = require("./secrets")};

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-central-1"
});

exports.send = (email, code) => {
    return ses.sendEmail({
        Source: "Winning Eleven - no reply <yuppiecore78@gmail.com>",
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Text: {
                    Data: code,
                },
            },
            Subject: {
                Data: "Your secret code to restore the password",
            }
        }
    }).promise();
};