import React, { useState } from 'react';
import { Modal } from 'react-native';
import DataleonWebView from './DataleonWebView';
import DataleonSDK from './DataleonSDK';

/**
 * DataleonModalHost
 *
 * React component that renders the Dataleon verification modal.
 * Should be placed once at the root of your app.
 * Handles the display of the DataleonWebView and communicates with DataleonSDK.
 *
 * @component
 * @returns {JSX.Element|null}
 *
 * Usage example:
 * ```jsx
 * <DataleonModalHost />
 * ```
 */
const DataleonModalHost = () => {
  const [state, setState] = useState({
    visible: false,
    sessionUrl: null,
    onResult: null,
  });

  DataleonSDK.setModalRenderer((params) =>
    setState((s) => ({ ...s, ...params }))
  );

  if (!state.visible) return null;

  return (
    <Modal visible={true} animationType="slide">
      <DataleonWebView sessionUrl={state.sessionUrl} onResult={state.onResult} />
    </Modal>
  );
};

export default DataleonModalHost;