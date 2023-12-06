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
  newrelic.instrument('parse-json', function (shim, parseJson, modName) {
    shim.wrap(parseJson, 'default', function wrapParseJson(shim, orig) {
      return function wrappedParsedJson() {
        //-- call original parseJson function and get result
        const result = orig.apply(this, arguments);
        //-- apppend a key of `instrumented`
        result.instrumented = true;
        return result;
      };
    });
  });
}
