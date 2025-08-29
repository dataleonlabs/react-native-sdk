# @dataleon/react-native-sdk

React Native SDK to integrate Dataleon verification via WebView.

## Permissions Setup (Camera & Microphone)

### 1️⃣ React Native – Camera and Microphone Permissions

#### 🔹 Android

In `android/app/src/main/AndroidManifest.xml`, add the following permissions **above** the `<application>` tag:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>
<uses-permission android:name="android.permission.INTERNET"/>
```

⚠️ **Important:** For Android 6+ (API 23+), you must request runtime permissions from React Native:

```js
import { PermissionsAndroid, Platform } from 'react-native';

async function requestCameraPermissions() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    return (
      granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
    );
  }
  return true;
}
```

#### 🔹 iOS

In `ios/YourApp/Info.plist`, add:

```xml
<key>NSCameraUsageDescription</key>
<string>The camera is required for identity verification</string>
<key>NSMicrophoneUsageDescription</key>
<string>The microphone may be used for video verification</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Access to the gallery for some documents (optional)</string>
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

iOS automatically handles permission prompts when the WebView or SDK tries to use the camera or microphone.


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

const startVerification = () => {
  DataleonSDK.launch({
    sessionUrl: 'https://your-session-url',
    onResult: ({ status }) => {
      if (status === DataleonSDK.statusDone) {
        // Success
      } else if (status === DataleonSDK.statusCanceled) {
        // Canceled by user
      } else if (status === DataleonSDK.statusError) {
        // Error occurred
      } else if (status === DataleonSDK.statusFailed) {
        // Verification failed
      } else if (status === DataleonSDK.statusStarted) {
        // Verification started
      }
    }
  });
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

- `DataleonSDK.launch({ sessionUrl, onResult })`  
  Launches the verification modal.  
  The `onResult` callback will be called with an object containing at least a `status` property

  Example:
  ```js
  DataleonSDK.launch({
    sessionUrl: 'https://your-session-url',
    onResult: ({ status }) => {
      if (status === DataleonSDK.statusDone) {
        // Success
      } else if (status === DataleonSDK.statusCanceled) {
        // Canceled by user
      } else if (status === DataleonSDK.statusError) {
        // Error occurred
      } else if (status === DataleonSDK.statusFailed) {
        // Verification failed
      } else if (status === DataleonSDK.statusStarted) {
        // Verification started
      }
    }
  });
  ```

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
