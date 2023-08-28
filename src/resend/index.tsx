import { Resend } from "resend";

interface EmailService {
  clientEmail: string | undefined;
  userEmail: string;
  content: string;
  name: string;
  number: string;
}

const EmailService = async ({
  clientEmail,
  userEmail,
  number,
  name,
  content,
}: EmailService) => {
  try {
    const apiKey = process.env.RESEND_API; // Get the API key from environment

    if (!apiKey) {
      throw new Error("Missing API key. Please provide the API key.");
    }

    const resend = new Resend(apiKey);

    resend.emails.send({
      from: userEmail,
      to: "info@homerealstate.es",
      subject: "Hello World",
      html: content + number,
    });
  } catch (e) {
    console.log(e);
  }
};

export default EmailService;
