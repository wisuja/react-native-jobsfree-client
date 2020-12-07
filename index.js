import { registerRootComponent } from 'expo';
import React from 'react';
import Toast from 'react-native-toast-message';

import App from './App';
import { Provider } from './src/context';

const provider = () => (
  <Provider>
    <App />
    <Toast ref={(ref) => Toast.setRef(ref)} />
  </Provider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(provider);
