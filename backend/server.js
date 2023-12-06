/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { initMainDB, initS3 } from './boot/init.js';
import { app } from './app.js';

//-- Load environment variables silently as well
await initMainDB();
await initS3();
const PORT = process.env.PORT || 5180;
try {
  app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`));
} catch (err) {
  console.log(`ERROR_start_server: ${err?.message}`);
  process.exit(0); 
}
