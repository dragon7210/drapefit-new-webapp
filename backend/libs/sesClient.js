/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { SESClient } from '@aws-sdk/client-ses';

const region = process.env.AWS_REGION;

const sesClient = new SESClient({ region });

export { sesClient };
