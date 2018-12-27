/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require('./src/utils/codeTheme.css');

exports.onServiceWorkerUpdateFound = () => {
  const answer = window.confirm(
    'The app has been updated, reload to display the latest content?'
  );

  if (answer) {
    window.location.reload();
  }
};
