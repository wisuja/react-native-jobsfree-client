import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { Context } from '../context';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Home({ navigation }) {
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (!user.isLoggedIn) navigation.navigate('Login');
  }, [user.isLoggedIn]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'md-home';
          } else if (route.name === 'Orders') {
            iconName = 'md-list';
          } else if (route.name === 'Settings') {
            iconName = 'md-settings';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3FA578',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen component={Dashboard} name="Dashboard"></Tab.Screen>
      <Tab.Screen component={Orders} name="Orders"></Tab.Screen>
      <Tab.Screen component={Settings} name="Settings"></Tab.Screen>
    </Tab.Navigator>
  );
}

const Dashboard = () => {
  const {
    state: { user },
  } = useContext(Context);

  if (user.isBuyer) {
    return <Buyer />;
  } else {
    return <Seller />;
  }
};

const Buyer = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={BuyerDashboard}
        name="BuyerDashboard"
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const BuyerDashboard = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [visible, setVisible] = useState(false);

  const cardsData = [
    {
      id: 1,
      title: 'test',
    },
    {
      id: 2,
      title: 'test2',
    },
    {
      id: 3,
      title: 'test3',
    },
  ];
  const renderCards = ({ title }, index) => {
    return (
      <Button
        buttonStyle={[styles.btnCard]}
        titleStyle={styles.textRegular}
        title={title}
        key={index}
        onPress={(prevState) => setVisible(!prevState)}
      ></Button>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.level}>
          <Text style={[styles.label, styles.coloredText]}>Dashboard</Text>
          <Image
            style={styles.icon}
            source={require('../assets/img/logo.png')}
          />
        </View>
        <Modal animationType="slide" visible={visible}>
          <Text onPress={() => setVisible(false)}>Test</Text>
        </Modal>
        <View
          style={[
            styles.marginalView,
            styles.paddingHorizontal,
            styles.w75,
            styles.floatLeft,
          ]}
        >
          <Text style={[styles.textRegular, { fontSize: 18 }]}>
            Hello{' '}
            <Text
              style={[
                styles.coloredText,
                styles.textBold,
                { textTransform: 'capitalize' },
              ]}
            >
              {user.name}
            </Text>
            , what are you looking for your freelance today?
          </Text>
        </View>

        <View
          style={[{ width: 330, alignSelf: 'center' }, styles.marginalView]}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {cardsData.map((card, index) => renderCards(card, index))}
          </ScrollView>
        </View>
        <View style={[styles.paddingHorizontal, styles.w75, styles.floatLeft]}>
          <Text style={[styles.textRegular, { fontSize: 18 }]}>
            Categories that you can find in{' '}
            <Text style={[styles.coloredText, styles.textBold]}>Jobsfree</Text>
          </Text>
        </View>
        <View style={[styles.level, styles.marginalView]}>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'red' }]}
            titleStyle={styles.textRegular}
            title="Logo Design"
          ></Button>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'salmon' }]}
            titleStyle={styles.textRegular}
            title="Illustration Design"
          ></Button>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'green' }]}
            titleStyle={styles.textRegular}
            title="Character Design"
          ></Button>
        </View>
        <View style={[styles.level, styles.marginalView]}>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'blue' }]}
            titleStyle={styles.textRegular}
            title="Game Artist"
          ></Button>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'tomato' }]}
            titleStyle={styles.textRegular}
            title="3D Design"
          ></Button>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'purple' }]}
            titleStyle={styles.textRegular}
            title="UI/UX Design"
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
};

const Seller = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        component={SellerDashboard}
        name="SellerDashboard"
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

const SellerDashboard = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.level}>
          <Text style={[styles.label, styles.coloredText]}>Dashboard</Text>
          <Image
            style={styles.icon}
            source={require('../assets/img/logo.png')}
          />
        </View>
        <View
          style={[
            styles.marginalView,
            styles.paddingHorizontal,
            styles.w75,
            styles.floatLeft,
          ]}
        >
          <Text style={[styles.textRegular, { fontSize: 18 }]}>
            Hello{' '}
            <Text
              style={[
                styles.coloredText,
                styles.textBold,
                { textTransform: 'capitalize' },
              ]}
            >
              {user.name}
            </Text>
            , let's find a client!
          </Text>
        </View>
        <View
          style={[styles.marginalView, styles.paddingHorizontal, styles.w75]}
        >
          <Image
            source={require('../assets/img/dashboard-jumbotron.png')}
            style={styles.jumbotron}
          ></Image>
        </View>
        <View style={[styles.marginalView, styles.paddingHorizontal]}>
          <Button
            title="Create a project"
            buttonStyle={styles.btnSeller}
          ></Button>
          <Button
            title="Ongoing projects"
            buttonStyle={styles.btnSeller}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
};

const Orders = () => {
  const {
    state: { user },
  } = useContext(Context);

  if (user.isBuyer) {
    return <BuyerOrders />;
  } else {
    return <SellerOrders />;
  }
};

const BuyerOrders = () => {
  let data = [
    {
      id: 1,
      title: 'Test',
    },
    {
      id: 2,
      title: 'Test2',
    },
    {
      id: 3,
      title: 'Test3',
    },
  ];

  const renderCards = ({ title }, index) => {
    return (
      <Button
        buttonStyle={[styles.btnOrder]}
        titleStyle={styles.textRegular}
        title={title}
        key={index}
      ></Button>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.level}>
          <Text style={[styles.label, styles.coloredText]}>Orders</Text>
          <Image
            style={styles.icon}
            source={require('../assets/img/logo.png')}
          />
        </View>
        <View style={(styles.container, { flexGrow: 2 })}>
          {data.map((card, index) => renderCards(card, index))}
        </View>
      </ScrollView>
    </View>
  );
};

const SellerOrders = () => {
  let data = [
    {
      id: 1,
      title: 'Test',
    },
    {
      id: 2,
      title: 'Test2',
    },
    {
      id: 3,
      title: 'Test3',
    },
  ];

  const renderCards = ({ title }, index) => {
    return (
      <Button
        buttonStyle={[styles.btnOrder]}
        titleStyle={styles.textRegular}
        title={title}
        key={index}
      ></Button>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.level}>
          <Text style={[styles.label, styles.coloredText]}>Orders</Text>
          <Image
            style={styles.icon}
            source={require('../assets/img/logo.png')}
          />
        </View>
        <View style={(styles.container, { flexGrow: 2 })}>
          {data.map((card, index) => renderCards(card, index))}
        </View>
      </ScrollView>
    </View>
  );
};

const Settings = () => {
  const {
    state: { user },
    logout,
  } = useContext(Context);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.level}>
          <Text style={[styles.label, styles.coloredText]}>Settings</Text>
          <Image
            style={styles.icon}
            source={require('../assets/img/logo.png')}
          />
        </View>

        <View style={[styles.marginalView, styles.paddingHorizontal]}>
          <Text
            style={[styles.greyText, styles.textRegular, styles.marginalView]}
          >
            Profile Settings
          </Text>
          <View
            style={{ backgroundColor: '#eee', padding: 10, borderRadius: 5 }}
          >
            <Button
              title="Edit Profile"
              buttonStyle={styles.btnSettings}
              titleStyle={[styles.textRegular, styles.darkText]}
            ></Button>
            <Divider style={{ backgroundColor: '#333', marginVertical: 10 }} />
            <Button
              title="Update Password"
              buttonStyle={styles.btnSettings}
              titleStyle={[styles.textRegular, styles.darkText]}
            ></Button>
          </View>
        </View>
        <View style={[styles.paddingHorizontal]}>
          <Text
            style={[styles.greyText, styles.textRegular, styles.marginalView]}
          >
            Reminder Settings
          </Text>
          <View
            style={{ backgroundColor: '#eee', padding: 10, borderRadius: 5 }}
          >
            <Button
              title="Edit Profile"
              buttonStyle={styles.btnSettings}
              titleStyle={[styles.textRegular, styles.darkText]}
            ></Button>
          </View>
        </View>
        <View style={[styles.paddingHorizontal]}>
          <Text
            style={[styles.greyText, styles.textRegular, styles.marginalView]}
          >
            About Us
          </Text>
          <View
            style={{ backgroundColor: '#eee', padding: 10, borderRadius: 5 }}
          >
            <Button
              title="About Us"
              buttonStyle={styles.btnSettings}
              titleStyle={[styles.textRegular, styles.darkText]}
            ></Button>
          </View>
        </View>
        <View style={[styles.marginalView, styles.paddingHorizontal]}>
          <Button
            title="Sign Out"
            buttonStyle={styles.btnLogout}
            titleStyle={[styles.textBold, styles.logoutText]}
            onPress={() => logout()}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
};

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: Platform.OS === 'android' ? height * 1.3 : height,
  },
  scroll: {
    flexGrow: 1,
  },
  level: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    alignItems: 'center',
    width: 380,
  },
  jumbotron: {
    width: 320,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  label: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  coloredText: {
    color: '#3FA578',
  },
  greyText: {
    color: 'grey',
  },
  darkText: {
    color: '#333',
  },
  marginalView: {
    marginVertical: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 30,
  },
  w75: {
    maxWidth: '75%',
  },
  floatLeft: {
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 10,
    width: 200,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  btnCard: {
    width: 150,
    height: 100,
    backgroundColor: '#3FA578',
    borderRadius: 5,
    marginRight: 10,
  },
  btnOrder: {
    backgroundColor: '#3FA578',
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 30,
    alignSelf: 'stretch',
    height: 100,
  },
  textRegular: {
    fontFamily: 'Roboto-Regular',
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
  },
  btnCategory: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  btnSettings: {
    justifyContent: 'flex-start',
    backgroundColor: '#eee',
    borderRadius: 5,
    height: 50,
    marginBottom: 5,
  },
  btnLogout: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
  },
  logoutText: {
    color: 'white',
    textTransform: 'uppercase',
  },

  btnSeller: {
    backgroundColor: '#3FA578',
    alignSelf: 'stretch',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});
