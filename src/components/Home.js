import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Context } from '../context';

export default function Home() {
  const {
    state: { username },
  } = useContext(Context);

  return (
    <View style={styles.container}>
      <Text>{username}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
