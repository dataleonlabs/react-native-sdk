import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import DataleonSDK from './DataleonSDK';

/**
 * DataleonWebView
 *
 * Displays a WebView for Dataleon verification and handles navigation and messaging events.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.sessionUrl - The session URL to load in the WebView.
 * @param {function} props.onResult - Callback to handle the verification result.
 * @returns {JSX.Element}
 *
 * Usage example:
 * ```jsx
 * <DataleonWebView sessionUrl="https://your-session-url" onResult={handleResult} />
 * ```
 */
const DataleonWebView = ({ sessionUrl, onResult }) => {
  const [loading, setLoading] = useState(true);

  const handleNavChange = (navState) => {
    const { url: navUrl } = navState;
    if (navUrl.includes('status=success')) {
      onResult({ status: DataleonSDK.statusDone });
    } else if (navUrl.includes('status=error')) {
      onResult({ status: DataleonSDK.statusError, error: 'Navigation error' });
    } else if (navUrl.includes('status=cancel')) {
      onResult({ status: DataleonSDK.statusCanceled });
    } else if (navUrl.includes('status=failed')) {
      onResult({ status: DataleonSDK.statusFailed, error: 'Verification failed' });
    }
  };

  const handleMessage = (event) => {
    const msg = event.nativeEvent.data;
    switch (msg) {
      case 'FINISHED':
        onResult({ status: DataleonSDK.statusDone });
        break;
      case 'FAILED':
        onResult({ status: DataleonSDK.statusFailed, error: 'Verification failed' });
        break;
      case 'ABORTED':
        onResult({ status: DataleonSDK.statusCanceled });
        break;
      case 'STARTED':
        onResult({ status: DataleonSDK.statusStarted });
        break;
      default:
        console.log('Message received from WebView:', msg);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <ActivityIndicator
          size="large"
          style={{ position: 'absolute', top: '50%', left: '50%' }}
        />
      )}
      <WebView
        source={{ uri: sessionUrl }}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled
        onNavigationStateChange={handleNavChange}
        onMessage={handleMessage}
      />
    </View>
  );
};

export default DataleonWebView;