import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class OfflineNotice extends Component {
  state = {
    isConnected: true,
  };

  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(this.handleNetworkChange);
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  handleNetworkChange = ({ isConnected }) => {
    this.setState({ isConnected });
  };

  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0,
    zIndex: 3,
  },
  offlineText: { color: '#fff' },
});

export default OfflineNotice;
