/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// Required to highlight syntax in <code /> elements
require('./src/utils/codeTheme.css');

exports.onServiceWorkerUpdateFound = () => {
  window.location.reload();
};
