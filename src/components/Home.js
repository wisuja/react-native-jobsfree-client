import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  Modal,
  Switch,
  TextInput,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import { Formik } from 'formik';
import * as Yup from 'yup';

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
      <Stack.Screen component={BuyerJobList} name="BuyerJobList"></Stack.Screen>
    </Stack.Navigator>
  );
};

const BuyerDashboard = ({ navigation }) => {
  const {
    state: { user, cards },
    fetchData,
    orderLapak,
    selectCategory,
  } = useContext(Context);

  const [visible, setVisible] = useState(false);
  const [cardData, setCardData] = useState({
    id: '',
    user_id: '',
    title: '',
    description: '',
    category_id: '',
    price_tag: '',
  });

  useEffect(() => {
    if (cards.length == 0) fetchData();
  }, [cards]);

  const renderCards = ({ id, title }, index) => {
    return (
      <Button
        buttonStyle={[styles.btnCard]}
        titleStyle={styles.textRegular}
        title={title}
        key={index}
        onPress={() => renderModal(id)}
      ></Button>
    );
  };

  const renderModal = (id) => {
    setVisible((previousState) => !previousState);

    let card = cards.find((c) => c.id == id);

    setCardData((previousState) => ({
      id: card.id,
      user_id: card.user_id,
      title: card.title,
      description: card.description,
      category_id: card.category_id,
      price_tag: card.price_tag,
    }));
  };

  const applyLapak = () => {
    orderLapak(cardData.id, cardData.user_id);
    setVisible((previousState) => !previousState);
  };

  const onPressCategory = (id) => {
    selectCategory(id);
    navigation.navigate('BuyerJobList');
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
            {cards.map((card, index) => renderCards(card, index))}
          </ScrollView>
        </View>
        <Modal animationType="slide" visible={visible}>
          <View style={[styles.container, { backgroundColor: '#eee' }]}>
            <Icon
              name="md-close"
              size={35}
              color="#333"
              style={{ alignSelf: 'flex-end', marginRight: 30, marginTop: 10 }}
              onPress={() => setVisible(false)}
            ></Icon>
            <Image
              style={styles.modalImage}
              source={require('../assets/img/logo.png')}
            ></Image>
            <View
              style={{
                flex: 2,
                backgroundColor: '#fff',
                alignSelf: 'stretch',
                alignItems: 'center',
                borderRadius: 30,
                marginTop: 30,
                paddingVertical: 10,
                paddingHorizontal: 30,
              }}
            >
              <Text
                style={[
                  styles.textRegular,
                  styles.floatRight,
                  styles.mediumText,
                ]}
              >
                {cardData.category_id}
              </Text>
              <Text
                style={[styles.textRegular, styles.floatLeft, styles.header]}
              >
                Title:{' '}
                <Text style={[styles.textBold, styles.floatLeft]}>
                  {cardData.title}
                </Text>
              </Text>
              <Text
                style={[styles.textRegular, styles.floatLeft, styles.header]}
              >
                Freelancer:{' '}
                <Text style={[styles.textBold, styles.floatLeft]}>
                  {cardData.user_id}
                </Text>
              </Text>
              <Text
                style={[styles.textBold, styles.floatLeft, styles.largeText]}
              >
                Rp {cardData.price_tag}
              </Text>
              <Text
                style={[
                  styles.textBold,
                  styles.floatLeft,
                  styles.header,
                  { marginTop: 30 },
                ]}
              >
                Description:
              </Text>
              <Text
                style={[
                  styles.textRegular,
                  styles.floatLeft,
                  styles.mediumText,
                ]}
              >
                {cardData.description}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginBottom: 35,
                }}
              >
                <Button
                  title="Apply"
                  buttonStyle={[styles.button, styles.applyButton]}
                  titleStyle={styles.applyButtonText}
                  onPress={applyLapak}
                ></Button>
              </View>
            </View>
          </View>
        </Modal>
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
            title="Logo"
            onPress={() => onPressCategory(1)}
          ></Button>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'salmon' }]}
            titleStyle={styles.textRegular}
            title="Illustration"
            onPress={() => onPressCategory(2)}
          ></Button>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'green' }]}
            titleStyle={styles.textRegular}
            title="Character Design"
            onPress={() => onPressCategory(3)}
          ></Button>
        </View>
        <View style={[styles.level, styles.marginalView]}>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'blue' }]}
            titleStyle={styles.textRegular}
            title="Game Design"
            onPress={() => onPressCategory(4)}
          ></Button>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'tomato' }]}
            titleStyle={styles.textRegular}
            title="3D Modeling"
            onPress={() => onPressCategory(5)}
          ></Button>
          <Button
            buttonStyle={[styles.btnCategory, { backgroundColor: 'purple' }]}
            titleStyle={styles.textRegular}
            title="UI/UX"
            onPress={() => onPressCategory(6)}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
};

const BuyerJobList = () => {
  const {
    state: { user, cards, selectedCategoryId },
    orderLapak,
  } = useContext(Context);

  const [visible, setVisible] = useState(false);
  const [cardData, setCardData] = useState({
    id: '',
    user_id: '',
    title: '',
    description: '',
    category_id: '',
    price_tag: '',
  });

  const renderCards = ({ id, title }, index) => {
    return (
      <Button
        buttonStyle={[styles.btnJob]}
        titleStyle={styles.textRegular}
        title={title}
        key={index}
        onPress={() => renderModal(id)}
      ></Button>
    );
  };

  const renderModal = (id) => {
    setVisible((previousState) => !previousState);

    let card = cards.find((c) => c.id == id);

    setCardData((previousState) => ({
      id: card.id,
      user_id: card.user_id,
      title: card.title,
      description: card.description,
      category_id: card.category_id,
      price_tag: card.price_tag,
    }));
  };

  const applyLapak = () => {
    orderLapak(cardData.id, cardData.user_id);
    setVisible((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.level}>
          <Text style={[styles.label, styles.coloredText]}>Job List</Text>
          <Image
            style={styles.icon}
            source={require('../assets/img/logo.png')}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          {cards.filter((c) => c.category_id == selectedCategoryId).length ==
          0 ? (
            <Text style={styles.textRegular}>No jobs in this category</Text>
          ) : (
            cards
              .filter((c) => c.category_id == selectedCategoryId)
              .map((card, index) => renderCards(card, index))
          )}
        </View>

        <Modal animationType="slide" visible={visible}>
          <View style={[styles.container, { backgroundColor: '#eee' }]}>
            <Icon
              name="md-close"
              size={35}
              color="#333"
              style={{ alignSelf: 'flex-end', marginRight: 30, marginTop: 10 }}
              onPress={() => setVisible(false)}
            ></Icon>
            <Image
              style={styles.modalImage}
              source={require('../assets/img/logo.png')}
            ></Image>
            <View
              style={{
                flex: 2,
                backgroundColor: '#fff',
                alignSelf: 'stretch',
                alignItems: 'center',
                borderRadius: 30,
                marginTop: 30,
                paddingVertical: 10,
                paddingHorizontal: 30,
              }}
            >
              <Text
                style={[
                  styles.textRegular,
                  styles.floatRight,
                  styles.mediumText,
                ]}
              >
                {cardData.category_id}
              </Text>
              <Text
                style={[styles.textRegular, styles.floatLeft, styles.header]}
              >
                Title:{' '}
                <Text style={[styles.textBold, styles.floatLeft]}>
                  {cardData.title}
                </Text>
              </Text>
              <Text
                style={[styles.textRegular, styles.floatLeft, styles.header]}
              >
                Freelancer:{' '}
                <Text style={[styles.textBold, styles.floatLeft]}>
                  {cardData.user_id}
                </Text>
              </Text>
              <Text
                style={[styles.textBold, styles.floatLeft, styles.largeText]}
              >
                Rp {cardData.price_tag}
              </Text>
              <Text
                style={[
                  styles.textBold,
                  styles.floatLeft,
                  styles.header,
                  { marginTop: 30 },
                ]}
              >
                Description:
              </Text>
              <Text
                style={[
                  styles.textRegular,
                  styles.floatLeft,
                  styles.mediumText,
                ]}
              >
                {cardData.description}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginBottom: 35,
                }}
              >
                <Button
                  title="Apply"
                  buttonStyle={[styles.button, styles.applyButton]}
                  titleStyle={styles.applyButtonText}
                  onPress={applyLapak}
                ></Button>
              </View>
            </View>
          </View>
        </Modal>
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

const SellerDashboard = ({ navigation }) => {
  const {
    state: { user, cards },
    createLapak,
    updateLapak,
    deleteLapak,
    fetchData,
  } = useContext(Context);

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [showMyJobsModalVisible, setShowMyJobsModalVisible] = useState(false);

  const [lapakData, setLapakData] = useState({
    id: '',
    category_id: '',
    title: '',
    description: '',
    price_tag: '',
  });

  useEffect(() => {
    if (cards.length == 0) fetchData();
  }, [cards]);

  const renderCards = ({ id, title }, index) => {
    return (
      <Button
        buttonStyle={[styles.btnOrder, { width: 300 }]}
        titleStyle={styles.textRegular}
        title={title}
        key={index}
        onPress={() => renderUpdateModal(id)}
      ></Button>
    );
  };

  const renderUpdateModal = (cardId) => {
    let { id, category_id, title, description, price_tag } = cards.find(
      (c) => c.id == cardId
    );

    setLapakData((previousState) => ({
      id,
      category_id,
      title,
      description,
      price_tag,
    }));

    setUpdateModalVisible((previousState) => !previousState);
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
            source={require('../assets/img/dashboard-seller.png')}
            style={styles.jumbotron}
          ></Image>
        </View>
        <View style={[styles.marginalView, styles.paddingHorizontal]}>
          <Button
            title="Create a project"
            buttonStyle={styles.btnSeller}
            onPress={() => setCreateModalVisible(true)}
          ></Button>
          <Modal animationType="slide" visible={createModalVisible}>
            <View style={[styles.container, { backgroundColor: '#eee' }]}>
              <Icon
                name="md-close"
                size={35}
                color="#333"
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 30,
                  marginTop: 10,
                }}
                onPress={() => setCreateModalVisible(false)}
              ></Icon>
              <Image
                style={styles.modalImage}
                source={require('../assets/img/logo.png')}
              ></Image>
              <View
                style={{
                  flex: 2,
                  backgroundColor: '#fff',
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  borderRadius: 30,
                  marginTop: 30,
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                }}
              >
                <Text
                  style={[
                    styles.textBold,
                    styles.header,
                    { marginVertical: 20 },
                  ]}
                >
                  Create Form
                </Text>
                <ScrollView
                  style={styles.formContainer}
                  showsVerticalScrollIndicator={false}
                >
                  <Formik
                    initialValues={{
                      category_id: 1,
                      title: '',
                      description: '',
                      price_tag: '',
                    }}
                    onSubmit={(values, { resetForm }) => {
                      createLapak(values);
                      resetForm();
                      set((previousState) => !previousState);
                    }}
                    validationSchema={Yup.object().shape({
                      category_id: Yup.number().required(
                        'Please pick a category'
                      ),
                      title: Yup.string().required('Title cannot be empty'),
                      description: Yup.string().required(
                        'Description cannot be empty'
                      ),
                      price_tag: Yup.number().required('Price cannot be empty'),
                    })}
                  >
                    {({
                      handleChange,
                      handleSubmit,
                      values,
                      errors,
                      setFieldTouched,
                      isValid,
                      touched,
                      setFieldValue,
                    }) => (
                      <>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Title</Text>
                          <TextInput
                            value={values.title}
                            onChangeText={handleChange('title')}
                            onBlur={() => setFieldTouched('title')}
                            style={styles.input}
                            autoFocus={true}
                          />
                          {touched.title && errors.title && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.title}
                            </Text>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Description</Text>
                          <TextInput
                            value={values.description}
                            onChangeText={handleChange('description')}
                            onBlur={() => setFieldTouched('description')}
                            style={styles.input}
                          />
                          {touched.description && errors.description && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.description}
                            </Text>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Category</Text>
                          <Picker
                            selectedValue={values.category_id}
                            onValueChange={(value) =>
                              setFieldValue('category_id', value)
                            }
                            style={styles.input}
                          >
                            <Picker.Item label="Logo" value={1} />
                            <Picker.Item label="Illustration" value={2} />
                            <Picker.Item label="Character Design" value={3} />
                            <Picker.Item label="Game Design" value={4} />
                            <Picker.Item label="3D Modeling" value={5} />
                            <Picker.Item label="UI/UX" value={6} />
                          </Picker>
                          {touched.category_id && errors.category_id && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.category_id}
                            </Text>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Price</Text>
                          <TextInput
                            value={values.price_tag}
                            onChangeText={handleChange('price_tag')}
                            onBlur={() => setFieldTouched('price_tag')}
                            style={styles.input}
                          />
                          {touched.price_tag && errors.price_tag && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.price_tag}
                            </Text>
                          )}
                        </View>
                        <Button
                          onPress={handleSubmit}
                          title="Create"
                          disabled={!isValid}
                          buttonStyle={[styles.button, styles.createButton]}
                          titleStyle={styles.createButtonText}
                        ></Button>
                      </>
                    )}
                  </Formik>
                </ScrollView>
              </View>
            </View>
          </Modal>
          <Button
            title="Ongoing projects"
            buttonStyle={styles.btnSeller}
            onPress={() => navigation.navigate('Orders')}
          ></Button>
          <Button
            title="My projects"
            buttonStyle={styles.btnSeller}
            onPress={() =>
              setShowMyJobsModalVisible((previousState) => !previousState)
            }
          ></Button>
          <Modal animationType="slide" visible={showMyJobsModalVisible}>
            <View style={[styles.container, { backgroundColor: '#eee' }]}>
              <Icon
                name="md-close"
                size={35}
                color="#333"
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 30,
                  marginVertical: 10,
                }}
                onPress={() =>
                  setShowMyJobsModalVisible((previousState) => !previousState)
                }
              ></Icon>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}
              >
                <View style={styles.level}>
                  <Text style={[styles.label, styles.coloredText]}>
                    My Jobs
                  </Text>
                  <Image
                    style={styles.icon}
                    source={require('../assets/img/logo.png')}
                  />
                </View>
                <View
                  style={{ flex: 2, alignItems: 'center', marginLeft: -10 }}
                >
                  {cards.filter((c) => c.user_id == user.id).length == 0 ? (
                    <Text>No Jobs Found</Text>
                  ) : (
                    cards
                      .filter((c) => c.user_id == user.id)
                      .map((card, index) => renderCards(card, index))
                  )}
                </View>
              </ScrollView>
            </View>
          </Modal>
          <Modal animationType="slide" visible={updateModalVisible}>
            <View style={[styles.container, { backgroundColor: '#eee' }]}>
              <Icon
                name="md-close"
                size={35}
                color="#333"
                style={{
                  alignSelf: 'flex-end',
                  marginRight: 30,
                  marginTop: 10,
                }}
                onPress={() => setUpdateModalVisible(false)}
              ></Icon>
              <Image
                style={styles.modalImage}
                source={require('../assets/img/logo.png')}
              ></Image>
              <View
                style={{
                  flex: 2,
                  backgroundColor: '#fff',
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  borderRadius: 30,
                  marginTop: 30,
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                }}
              >
                <Text
                  style={[
                    styles.textBold,
                    styles.header,
                    { marginVertical: 20 },
                  ]}
                >
                  Update Form
                </Text>
                <Icon
                  name="md-trash"
                  size={35}
                  color="#333"
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 30,
                    marginTop: 10,
                  }}
                  onPress={() => deleteLapak(lapakData.id)}
                ></Icon>
                <ScrollView
                  style={styles.formContainer}
                  showsVerticalScrollIndicator={false}
                >
                  <Formik
                    initialValues={{
                      id: lapakData.id,
                      category_id: lapakData.category_id,
                      title: lapakData.title,
                      description: lapakData.description,
                      price_tag: lapakData.price_tag,
                    }}
                    onSubmit={(values, { resetForm }) => {
                      updateLapak(values);
                      resetForm();
                      setUpdateModalVisible((previousState) => !previousState);
                    }}
                    validationSchema={Yup.object().shape({
                      category_id: Yup.number().required(
                        'Please pick a category'
                      ),
                      title: Yup.string().required('Title cannot be empty'),
                      description: Yup.string().required(
                        'Description cannot be empty'
                      ),
                      price_tag: Yup.number().required('Price cannot be empty'),
                    })}
                  >
                    {({
                      handleChange,
                      handleSubmit,
                      values,
                      errors,
                      setFieldTouched,
                      isValid,
                      touched,
                      setFieldValue,
                    }) => (
                      <>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Title</Text>
                          <TextInput
                            value={values.title}
                            onChangeText={handleChange('title')}
                            onBlur={() => setFieldTouched('title')}
                            style={styles.input}
                            autoFocus={true}
                          />
                          {touched.title && errors.title && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.title}
                            </Text>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Description</Text>
                          <TextInput
                            value={values.description}
                            onChangeText={handleChange('description')}
                            onBlur={() => setFieldTouched('description')}
                            style={styles.input}
                          />
                          {touched.description && errors.description && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.description}
                            </Text>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Category</Text>
                          <Picker
                            selectedValue={values.category_id}
                            onValueChange={(value) =>
                              setFieldValue('category_id', value)
                            }
                            style={styles.input}
                          >
                            <Picker.Item label="Logo" value={1} />
                            <Picker.Item label="Illustration" value={2} />
                            <Picker.Item label="Character Design" value={3} />
                            <Picker.Item label="Game Design" value={4} />
                            <Picker.Item label="3D Modeling" value={5} />
                            <Picker.Item label="UI/UX" value={6} />
                          </Picker>
                          {touched.category_id && errors.category_id && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.category_id}
                            </Text>
                          )}
                        </View>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Price</Text>
                          <TextInput
                            value={values.price_tag}
                            onChangeText={handleChange('price_tag')}
                            onBlur={() => setFieldTouched('price_tag')}
                            style={styles.input}
                          />
                          {touched.price_tag && errors.price_tag && (
                            <Text style={{ fontSize: 10, color: 'red' }}>
                              {errors.price_tag}
                            </Text>
                          )}
                        </View>
                        <Button
                          onPress={handleSubmit}
                          title="Update"
                          disabled={!isValid}
                          buttonStyle={[styles.button, styles.createButton]}
                          titleStyle={styles.createButtonText}
                        ></Button>
                      </>
                    )}
                  </Formik>
                </ScrollView>
              </View>
            </View>
          </Modal>
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
    state: {
      user: { idcard_no, name, email, phone_no, isBuyer },
      reminder,
      error: { message },
      updatePasswordSuccess,
      editProfileSuccess,
    },
    logout,
    toggleReminder,
    updatePassword,
    editProfile,
  } = useContext(Context);

  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [updatePasswordVisible, setUpdatePasswordVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

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
              onPress={() =>
                setEditProfileVisible((previousState) => !previousState)
              }
            ></Button>
            <Modal animationType="slide" visible={editProfileVisible}>
              <View style={[styles.container, { backgroundColor: '#eee' }]}>
                <Icon
                  name="md-close"
                  size={35}
                  color="#333"
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 30,
                    marginTop: 10,
                  }}
                  onPress={() =>
                    setEditProfileVisible((previousState) => !previousState)
                  }
                ></Icon>
                <Image
                  style={styles.modalImage}
                  source={require('../assets/img/logo.png')}
                ></Image>
                <View
                  style={{
                    flex: 2,
                    backgroundColor: '#fff',
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    borderRadius: 30,
                    marginTop: 30,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                  }}
                >
                  <Text
                    style={[
                      styles.textBold,
                      styles.header,
                      { marginVertical: 20 },
                    ]}
                  >
                    Edit Profile
                  </Text>
                  <ScrollView
                    style={styles.formContainer}
                    showsVerticalScrollIndicator={false}
                  >
                    <Formik
                      initialValues={{
                        idNumber: idcard_no,
                        name: name,
                        email: email,
                        phone: phone_no,
                        isBuyer: isBuyer,
                      }}
                      onSubmit={(values, { resetForm }) => {
                        editProfile(values);
                        resetForm();
                        if (editProfileSuccess)
                          setEditProfileVisible(
                            (previousState) => !previousState
                          );
                      }}
                      validationSchema={Yup.object().shape({
                        idNumber: Yup.number().required(
                          'ID Number cannot be empty'
                        ),
                        name: Yup.string().required('Name cannot be empty'),
                        email: Yup.string()
                          .email('Please insert a valid email')
                          .required('Email cannot be empty'),
                        phone: Yup.string()
                          .required('Phone number cannot be empty')
                          .min(11, 'Minimal 11 numbers')
                          .max(13, 'Maximal 13 numbers'),
                      })}
                    >
                      {({
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        setFieldTouched,
                        isValid,
                        touched,
                        setFieldValue,
                      }) => (
                        <>
                          {message ? (
                            <View style={styles.errorContainer}>
                              <Text style={styles.errorMessage}>{message}</Text>
                            </View>
                          ) : (
                            []
                          )}
                          <View style={[styles.level, styles.inputContainer]}>
                            <Text style={[styles.label, { marginLeft: -30 }]}>
                              {values.isBuyer ? 'Buyer' : 'Seller'}
                            </Text>
                            <Switch
                              trackColor={{ false: '#333', true: '#c7ffd6' }}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={(value) =>
                                setFieldValue('isBuyer', value)
                              }
                              style={{ marginRight: 30 }}
                              value={values.isBuyer}
                            />
                          </View>
                          <View style={styles.inputContainer}>
                            <Text style={styles.label}>ID Number</Text>
                            <TextInput
                              value={values.idNumber}
                              onChangeText={handleChange('idNumber')}
                              onBlur={() => setFieldTouched('idNumber')}
                              style={styles.input}
                              autoFocus={true}
                            />
                            {touched.idNumber && errors.idNumber && (
                              <Text style={{ fontSize: 10, color: 'red' }}>
                                {errors.idNumber}
                              </Text>
                            )}
                          </View>
                          <View style={styles.inputContainer}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                              value={values.name}
                              onChangeText={handleChange('name')}
                              onBlur={() => setFieldTouched('name')}
                              style={styles.input}
                            />
                            {touched.name && errors.name && (
                              <Text style={{ fontSize: 10, color: 'red' }}>
                                {errors.name}
                              </Text>
                            )}
                          </View>
                          <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                              value={values.email}
                              onChangeText={handleChange('email')}
                              onBlur={() => setFieldTouched('email')}
                              style={styles.input}
                            />
                            {touched.email && errors.email && (
                              <Text style={{ fontSize: 10, color: 'red' }}>
                                {errors.email}
                              </Text>
                            )}
                          </View>
                          <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone</Text>
                            <TextInput
                              value={values.phone}
                              onChangeText={handleChange('phone')}
                              onBlur={() => setFieldTouched('phone')}
                              style={styles.input}
                            />
                            {touched.phone && errors.phone && (
                              <Text style={{ fontSize: 10, color: 'red' }}>
                                {errors.phone}
                              </Text>
                            )}
                          </View>
                          <Button
                            onPress={handleSubmit}
                            title="Edit Profile"
                            disabled={!isValid}
                            buttonStyle={[styles.button, styles.createButton]}
                            titleStyle={styles.createButtonText}
                          ></Button>
                        </>
                      )}
                    </Formik>
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <Divider style={{ backgroundColor: '#333', marginVertical: 10 }} />
            <Button
              title="Update Password"
              buttonStyle={styles.btnSettings}
              titleStyle={[styles.textRegular, styles.darkText]}
              onPress={() =>
                setUpdatePasswordVisible((previousState) => !previousState)
              }
            ></Button>
            <Modal animationType="slide" visible={updatePasswordVisible}>
              <View style={[styles.container, { backgroundColor: '#eee' }]}>
                <Icon
                  name="md-close"
                  size={35}
                  color="#333"
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 30,
                    marginTop: 10,
                  }}
                  onPress={() =>
                    setUpdatePasswordVisible((previousState) => !previousState)
                  }
                ></Icon>
                <Image
                  style={styles.modalImage}
                  source={require('../assets/img/logo.png')}
                ></Image>
                <View
                  style={{
                    flex: 2,
                    backgroundColor: '#fff',
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    borderRadius: 30,
                    marginTop: 30,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                  }}
                >
                  <Text
                    style={[
                      styles.textBold,
                      styles.header,
                      { marginVertical: 20 },
                    ]}
                  >
                    Update Password
                  </Text>
                  <ScrollView
                    style={styles.formContainer}
                    showsVerticalScrollIndicator={false}
                  >
                    <Formik
                      initialValues={{
                        password: '',
                        newPassword: '',
                      }}
                      onSubmit={(values, { resetForm }) => {
                        updatePassword(values);
                        resetForm();
                        if (updatePasswordSuccess)
                          setUpdatePasswordVisible(
                            (previousState) => !previousState
                          );
                      }}
                      validationSchema={Yup.object().shape({
                        oldPassword: Yup.string().required(
                          'Password cannot be empty'
                        ),
                        newPassword: Yup.string()
                          .required('Password cannot be empty')
                          .min(8, 'Minimal 8 characters'),
                        newPasswordConfirmation: Yup.string()
                          .required('Password confirmation cannot be empty')
                          .test(
                            'passwords-match',
                            'passwords must match',
                            function (value) {
                              return this.parent.newPassword == value;
                            }
                          ),
                      })}
                    >
                      {({
                        handleChange,
                        handleSubmit,
                        values,
                        errors,
                        setFieldTouched,
                        isValid,
                        touched,
                      }) => (
                        <>
                          {message ? (
                            <View style={styles.errorContainer}>
                              <Text style={styles.errorMessage}>{message}</Text>
                            </View>
                          ) : (
                            []
                          )}
                          <View style={styles.inputContainer}>
                            <Text style={styles.label}>Old Password</Text>
                            <TextInput
                              value={values.oldPassword}
                              onChangeText={handleChange('oldPassword')}
                              onBlur={() => setFieldTouched('oldPassword')}
                              style={styles.input}
                              autoFocus={true}
                              secureTextEntry={true}
                            />
                            {touched.oldPassword && errors.oldPassword && (
                              <Text style={{ fontSize: 10, color: 'red' }}>
                                {errors.oldPassword}
                              </Text>
                            )}
                          </View>
                          <View style={styles.inputContainer}>
                            <Text style={styles.label}>New Password</Text>
                            <TextInput
                              value={values.newPassword}
                              onChangeText={handleChange('newPassword')}
                              onBlur={() => setFieldTouched('newPassword')}
                              style={styles.input}
                              secureTextEntry={true}
                            />
                            {touched.newPassword && errors.newPassword && (
                              <Text style={{ fontSize: 10, color: 'red' }}>
                                {errors.newPassword}
                              </Text>
                            )}
                          </View>
                          <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                              New Password Confirmation
                            </Text>
                            <TextInput
                              value={values.newPasswordConfirmation}
                              onChangeText={handleChange(
                                'newPasswordConfirmation'
                              )}
                              onBlur={() =>
                                setFieldTouched('newPasswordConfirmation')
                              }
                              style={styles.input}
                              secureTextEntry={true}
                            />
                            {touched.newPasswordConfirmation &&
                              errors.newPasswordConfirmation && (
                                <Text style={{ fontSize: 10, color: 'red' }}>
                                  {errors.newPasswordConfirmation}
                                </Text>
                              )}
                          </View>
                          <Button
                            onPress={handleSubmit}
                            title="Update Password"
                            disabled={!isValid}
                            buttonStyle={[styles.button, styles.createButton]}
                            titleStyle={styles.createButtonText}
                          ></Button>
                        </>
                      )}
                    </Formik>
                  </ScrollView>
                </View>
              </View>
            </Modal>
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
            <View style={[styles.btnSettings, styles.btnReminder]}>
              <Text
                style={[styles.textRegular, styles.darkText, { fontSize: 16 }]}
              >
                Reminder
              </Text>
              <Switch
                trackColor={{ false: '#333', true: '#c7ffd6' }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => toggleReminder(value)}
                value={reminder}
              />
            </View>
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
              onPress={() => setAboutVisible((previousState) => !previousState)}
            ></Button>

            <Modal animationType="slide" visible={aboutVisible}>
              <View style={[styles.container, { backgroundColor: '#eee' }]}>
                <Icon
                  name="md-close"
                  size={35}
                  color="#333"
                  style={{
                    alignSelf: 'flex-end',
                    marginRight: 30,
                    marginTop: 10,
                  }}
                  onPress={() =>
                    setAboutVisible((previousState) => !previousState)
                  }
                ></Icon>
                <Image
                  style={styles.modalImage}
                  source={require('../assets/img/logo.png')}
                ></Image>
                <View
                  style={{
                    flex: 2,
                    backgroundColor: '#fff',
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    borderRadius: 30,
                    marginTop: 30,
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                  }}
                >
                  <Text style={[styles.textBold, styles.header]}>
                    Hi! We are Jobsfree.
                  </Text>
                  <Text> </Text>
                  <Text style={[styles.textRegular, styles.mediumText]}>
                    We are 4-man team that built this app. We use React Native
                    for front end, and CodeIgniter for the APIs.
                  </Text>
                  <Text> </Text>
                  <Text style={[styles.textRegular, styles.mediumText]}>
                    We are Andry (1831006), Rosita Tandiono (1831078), Tedy
                    Fernando (1831077), and William Surya Jaya (1831164).
                  </Text>
                </View>
              </View>
            </Modal>
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
  modalImage: {
    width: 200,
    height: 200,
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
  floatRight: {
    alignSelf: 'flex-end',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 20,
  },
  header: {
    fontSize: 24,
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 5,
    padding: 10,
    width: 380,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    width: 325,
    marginTop: 25,
  },
  btnCard: {
    width: 150,
    height: 100,
    backgroundColor: '#3FA578',
    borderRadius: 5,
    marginRight: 10,
  },
  btnJob: {
    width: 150,
    height: 100,
    backgroundColor: '#3FA578',
    borderRadius: 5,
    marginBottom: 10,
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
  btnReminder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  applyButton: {
    backgroundColor: '#3FA578',
  },
  applyButtonText: {
    color: '#eee',
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  errorContainer: {
    backgroundColor: '#ffb0bd',
    padding: 10,
    // marginTop: -15,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'stretch',
  },
  errorMessage: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 25,
  },
  createButton: {
    backgroundColor: '#3FA578',
  },
  createButtonText: {
    color: '#eee',
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
});
