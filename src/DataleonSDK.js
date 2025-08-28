/**
 * DataleonSDK
 *
 * Static class to launch and manage the Dataleon verification modal.
 * Provides status constants and a launch method that returns a Promise
 * resolved with the result of the verification process.
 */
class DataleonSDK {
  /**
   * Status indicating the process is finished successfully.
   * @type {string}
   */
  static statusDone = 'done';

  /**
   * Status indicating the process was canceled by the user.
   * @type {string}
   */
  static statusCanceled = 'canceled';

  /**
   * Status indicating an error occurred during the process.
   * @type {string}
   */
  static statusError = 'error';

  /**
   * Status indicating the process has started.
   * @type {string}
   */
  static statusStarted = 'started';

  /**
   * Status indicating the process has failed.
   * @type {string}
   */
  static statusFailed = 'failed';

  /**
   * Launches the Dataleon verification modal.
   * Returns a Promise resolved with an object containing the status and optional error.
   *
   * @param {Object} params
   * @param {string} params.sessionUrl - The URL to load in the WebView.
   * @returns {Promise<{status: string, error?: string}>}
   */
  static launch({ sessionUrl }) {
    return new Promise((resolve) => {
      DataleonSDK._showModal(sessionUrl, resolve);
    });
  }

  /**
   * Closes the Dataleon verification modal from outside.
   */
  static close() {
    DataleonSDK._hideModal();
  }

  /**
   * Internal method to show the modal.
   * @private
   * @param {string} sessionUrl
   * @param {function} resolve
   */
  static _showModal(sessionUrl, resolve) {
    DataleonSDK._modalRenderer({
      visible: true,
      sessionUrl,
      onResult: (res) => {
        if (res.status && res.status === 'canceled') {
          DataleonSDK._hideModal();
        }
        resolve(res);
      },
    });
  }

  /**
   * Internal method to hide the modal.
   * @private
   */
  static _hideModal() {
    DataleonSDK._modalRenderer({ visible: false });
  }

  /**
   * Sets the modal renderer function.
   * Should be called by the DataleonModalHost component.
   *
   * @param {function} fn
   */
  static setModalRenderer(fn) {
    DataleonSDK._modalRenderer = fn;
  }
}

export default DataleonSDK;
