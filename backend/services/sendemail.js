const mailgun = require("mailgun-js");

const sendemail = () => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN_NAME,
  });
  const data = {
    from: "Alicia Tsiory <meanproject-alicia-tsiory@projet.itu>",
    to: "tsioryrovantsoa@gmail.com",
    subject: "New member",
    text: "Une utilisateur est nouveau sur votre application!",
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
    console.log(error);
  });
}

module.exports = {
  sendemail
};
