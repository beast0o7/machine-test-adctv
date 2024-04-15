require("dotenv").config()
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const clientSecret = "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";

const createTransporter = async () => {
    try {
      const oauth2Client = new OAuth2(
          process.env.CLIENT_ID,
          clientSecret,
          "https://developers.google.com/oauthplayground"
        );
 
        oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN,
        });
 
        const accessToken = await new Promise((resolve, reject) => {
          oauth2Client.getAccessToken((err, token) => {
            if (err) {
              console.log("*ERR: ", err)
              reject();
            }
            resolve(token); 
          });
        });
 
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: process.env.USER_EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: clientSecret,
            refreshToken: process.env.REFRESH_TOKEN,
          },
        });
        return transporter;
    } catch (err) {
      return err
    }
  };


  exports.sendMail = async (mailTo,subject,body) => {
    try {
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: mailTo,
        subject: subject,
        html: body
      }
 
      let emailTransporter = await createTransporter();
      await emailTransporter.sendMail(mailOptions);
    } catch (err) {
      console.log("ERROR: ", err)
    }
  };
 