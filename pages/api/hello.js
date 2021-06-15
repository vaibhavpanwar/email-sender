const sgMail = require("@sendgrid/mail");

export default (req, res) => {
  const body = req.body;
  const customMessage = `
  Name: ${body.name}\r\n
  Email: ${body.email}\r\n
  Message: ${body.message}
`;

  sgMail.setApiKey(process.env.API_KEY);
  const msg = {
    to: "vaibhavpanwar1402@gmail.com", // Change to your recipient
    from: "vaibhav@grivety.tech", // Change to your verified sender
    subject: "Test Subject",
    text: customMessage,
    html: customMessage.replace(/\r\n/g, "<br>"),
  };

  try {
    sgMail
      .send(msg)
      .then(() => {
        res.status(200).send("ok");
      })
      .catch((error) => {
        console.error(error);
        res.status(500);
      });
  } catch (error) {
    res.status(500);
  }
};
