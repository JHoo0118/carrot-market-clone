import twilio from 'twilio';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import smtpTransport from '@libs/server/email';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + '';
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!, // 원래는 입력받은 phone으로 해야함, 지금은 제한된 계정
    //   body: `Your login token is ${payload}`,
    // });
    // console.log(message);
  } else if (email) {
    // const mailOptions = {
    //   from: process.env.NODEMAILER_ID,
    //   to: email,
    //   subject: 'Your Carrot Market Verification Email',
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // };
    // const result = await smtpTransport.sendMail(mailOptions, (error, responses) => {
    //   if (error) {
    //     console.log(error);
    //     return null;
    //   } else {
    //     console.log(responses);
    //     return null;
    //   }
    // });
    // smtpTransport.close();
    // console.log(result);
  }
  return res.json({
    ok: true,
  });
}

export default withHandler('POST', handler);
