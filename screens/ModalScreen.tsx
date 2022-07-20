import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Heading, Divider, Center, useTheme } from 'native-base';

// need to abstract this component so it's reusable
export const ModalScreen = () => {
  const theme = useTheme();

  return (
    <Center bg="white" px={4} flex={1}>
      <Heading fontSize={20}>Modal</Heading>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Center>
  );
}

export default ModalScreen;
