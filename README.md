# @dataleon/react-native-sdk

React Native SDK to integrate Dataleon verification via WebView.

## Installation

```bash
npm install @dataleon/react-native-sdk react-native-webview
```

## Usage

### 1. Add the Modal Host to your App

Place the `DataleonModalHost` component once at the root of your app (for example, in `App.js`):

```jsx
import React from 'react';
import { DataleonModalHost } from '@dataleon/react-native-sdk';

export default function App() {
  return (
    <>
      {/* ...your app content... */}
      <DataleonModalHost />
    </>
  );
}
```

### 2. Launch the Verification Modal

Call the `DataleonSDK.launch` method where you want to start the verification process (for example, on a button press):

```jsx
import { DataleonSDK } from '@dataleon/react-native-sdk';

const startVerification = async () => {
  const result = await DataleonSDK.launch({ sessionUrl: 'https://your-session-url' });
  if (result.status === DataleonSDK.statusDone) {
    // Success
  } else if (result.status === DataleonSDK.statusCanceled) {
    // Canceled by user
  } else if (result.status === DataleonSDK.statusError) {
    // Error occurred
  } else if (result.status === DataleonSDK.statusFailed) {
    // Verification failed
  } else if (result.status === DataleonSDK.statusStarted) {
    // Verification started
  }
};
```

### 3. (Optional) Use the WebView Directly

You can also use the `DataleonWebView` component directly if you want to manage the modal yourself:

```jsx
import { DataleonWebView } from '@dataleon/react-native-sdk';

const handleResult = (result) => {
  // Handle result object
};

<DataleonWebView sessionUrl="https://your-session-url" onResult={handleResult} />;
```

## API

### DataleonSDK

- `DataleonSDK.launch({ sessionUrl })`  
  Launches the verification modal. Returns a Promise with the result object.

- Status constants:
  - `DataleonSDK.statusDone`
  - `DataleonSDK.statusCanceled`
  - `DataleonSDK.statusError`
  - `DataleonSDK.statusStarted`
  - `DataleonSDK.statusFailed`

### DataleonModalHost

React component to be placed once at the root of your app. Handles the modal rendering.

### DataleonWebView

React component that displays the verification WebView.  
Props:
- `sessionUrl` (string): The URL to load.
- `onResult` (function): Callback called with the result.

##
