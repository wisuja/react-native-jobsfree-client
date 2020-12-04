import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';

export default function Dashboard() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.level}>
        <Text style={[styles.label, styles.coloredText]}>Dashboard</Text>
        <Image
          style={styles.icon}
          source={require('../../assets/img/logo.png')}
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
        <Text style={styles.textRegular}>
          Hello <Text style={[styles.coloredText, styles.textBold]}>Admin</Text>
          , what are you looking for your freelance today?
        </Text>
      </View>
      <View style={[styles.level]}>
        <View style={styles.searchContainer}>
          <Icon name="md-search" size={30} color="grey"></Icon>
          <TextInput
            style={styles.input}
            placeholder="Search for demanded jobs"
          ></TextInput>
        </View>
        <Icon
          name="md-options"
          size={30}
          color="grey"
          style={{ marginRight: 10 }}
        ></Icon>
      </View>
      <View style={[styles.level, styles.marginalView]}>
        <Image
          source={require('../../assets/img/dashboard-jumbotron.png')}
          style={styles.jumbotron}
        ></Image>
        <View>
          <Button
            buttonStyle={[styles.btnAction, styles.marginalButton]}
            titleStyle={styles.textRegular}
            title="Apply for Job"
          />
          <Button
            buttonStyle={[styles.btnAction, styles.marginalButton]}
            titleStyle={styles.textRegular}
            title="Ongoing Job"
          />
          <Button
            buttonStyle={[styles.btnAction, styles.marginalButton]}
            titleStyle={styles.textRegular}
            title="Create Project"
          />
          <Button
            buttonStyle={[styles.btnAction, styles.marginalButton]}
            titleStyle={styles.textRegular}
            title="Feedback"
          />
        </View>
      </View>
      <View style={[styles.paddingHorizontal, styles.w75, styles.floatLeft]}>
        <Text style={styles.textRegular}>
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
      <View style={[styles.paddingHorizontal, styles.w75, styles.floatLeft]}>
        <Text style={styles.textRegular}>
          <Text style={[styles.coloredText, styles.textBold]}>Jobsfree</Text>{' '}
          helps <Text style={[styles.coloredText, styles.textBold]}>Admin</Text>{' '}
          by recommending jobs.
        </Text>
      </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  level: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    alignItems: 'center',
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
  jumbotron: {
    width: 175,
    height: 230,
    resizeMode: 'stretch',
    borderRadius: 30,
  },
  btnAction: {
    width: 150,
    backgroundColor: '#3FA578',
    borderRadius: 5,
  },
  marginalButton: {
    marginVertical: 10,
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
  },
});
