import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Heading, Divider, Center, Text } from 'native-base';
import { RootStackScreenProps } from '../types';

export const NotFoundScreen = ({ navigation }: RootStackScreenProps<'NotFound'>) => {
  return (
    <Center bg="white" px={4} flex={1}>
      <Heading fontSize={20}>This screen doesn't exist.</Heading>
      <Divider style={styles.separator} />
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  separator: {
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default NotFoundScreen;
