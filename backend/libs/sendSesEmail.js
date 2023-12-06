/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { SendEmailCommand } from '@aws-sdk/client-ses';

import { sesClient } from './sesClient.js';

const sendSesEmail = async (toAddress, fromAddress, subject, htmlBody, textBody) => {
  try {
    //-- configure email command
    const createSendEmailCommand = (toAddr, fromAddr, subj, htmlbd, txtbd) => {
      return new SendEmailCommand({
        Destination: {
          CcAddresses: [],
          ToAddresses: [
            toAddr
            /* more To-email addresses */
          ]
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: htmlbd
            },
            Text: {
              Charset: 'UTF-8',
              Data: txtbd
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subj
          }
        },
        Source: fromAddr,
        ReplyToAddresses: []
      });
    };
    //-- send email
    return await sesClient.send(createSendEmailCommand(toAddress, fromAddress, subject, htmlBody, textBody));
  } catch (e) {
    console.log('LIB_sendSesEmail_ERROR:', e?.message);
    return new Error('Failed to send email');
  }
};

export { sendSesEmail };
