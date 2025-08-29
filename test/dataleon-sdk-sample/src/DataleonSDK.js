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
  static statusDone = 'FINISHED';

  /**
   * Status indicating the process was canceled by the user.
   * @type {string}
   */
  static statusCanceled = 'CANCELED';

  /**
   * Status indicating an error occurred during the process.
   * @type {string}
   */
  static statusError = 'ERROR';

  /**
   * Status indicating the process has started.
   * @type {string}
   */
  static statusStarted = 'STARTED';

  /**
   * Status indicating the process has failed.
   * @type {string}
   */
  static statusFailed = 'FAILED';

  /**
   * Launches the Dataleon verification modal.
   * Returns a Promise resolved with an object containing the status and optional error.
   *
   * @param {Object} params
   * @param {string} params.sessionUrl - The URL to load in the WebView.
   * @param {function} params.onResult - Callback to handle the verification result.
   * @returns {Promise<{status: string, error?: string}>}
   */
  static launch({ sessionUrl, onResult }) {
    return DataleonSDK._showModal(sessionUrl, ({ status }) => {
      onResult && onResult({ status });
      if (status === DataleonSDK.statusDone || status === DataleonSDK.statusCanceled) {
        this.close()
      }
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
   * @param {function} onResult
   */
  static _showModal(sessionUrl, onResult) {
    DataleonSDK._modalRenderer({
      visible: true,
      sessionUrl,
      onResult,
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
