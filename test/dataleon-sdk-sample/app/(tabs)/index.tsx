import { Image } from 'expo-image';
import { Platform, StyleSheet, Button } from 'react-native';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DataleonModalHost, DataleonSDK } from '../../src/index';

export default function HomeScreen() {
  const startVerification =  () => {
    DataleonSDK.launch({
      sessionUrl: 'https://console-local.dataleon.ai/w/76bf997a-219e-4e0a-b676-e4435ba6445c',
      onResult: ({ status }: any) => {
        if (status === DataleonSDK.statusDone) {
          // Success
          alert('Verification successful!');
        } else if (status === DataleonSDK.statusCanceled) {
          // Canceled by user
          alert('Verification canceled by user.');
        } else if (status === DataleonSDK.statusError) {
          // Error occurred
          alert('Verification error occurred.');
        } else if (status === DataleonSDK.statusFailed) {
          // Verification failed
          alert('Verification failed.');
        } else if (status === DataleonSDK.statusStarted) {
          // Verification started
          alert('Verification started.');
        }
      }
    });
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      {/* Add button to open Dataleon Modal */}
      <ThemedView style={styles.stepContainer}>
        <Button title="Open Dataleon Modal" onPress={startVerification} />
      </ThemedView>
      <DataleonModalHost />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
