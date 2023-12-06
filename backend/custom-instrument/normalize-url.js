/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import newrelic from 'newrelic';

export default function () {
  newrelic.instrument('normalize-url', function (shim, normalizeUrl, modName) {
    shim.wrap(normalizeUrl, 'default', function wrapNormalizeUrl(shim, orig) {
      return function wrappedNormalizeUrl() {
        //-- call original normalizeUrl function and get result
        const result = orig.apply(this, arguments);
        //-- append instrumented to the normalized url
        return `${result}/instrumented`;
      };
    });
  });
}
