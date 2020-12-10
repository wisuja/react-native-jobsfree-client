import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-elements';

import { Context } from '../context';

import Logo from '../utils/Logo';
import OfflineNotice from '../utils/OfflineNotice';

export default function Login({ navigation }) {
  const {
    login,
    state: {
      user,
      error: { message },
    },
  } = useContext(Context);

  useEffect(() => {
    if (user.isLoggedIn) navigation.navigate('Home');
  }, [user.isLoggedIn]);

  return (
    <View style={styles.container}>
      <OfflineNotice />
      <Logo />
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.level}>
          <Text style={styles.link}>Sign In</Text>
        </View>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values, { resetForm }) => {
            login(values);
            resetForm();
          }}
          validationSchema={Yup.object({
            email: Yup.string().required('Email cannot be empty'),
            password: Yup.string().required('Password cannot be empty'),
          })}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            setFieldTouched,
            touched,
            isValid,
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
                <Text style={styles.label}>Password</Text>
                <TextInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  secureTextEntry={true}
                  style={styles.input}
                />
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.password}
                  </Text>
                )}
              </View>
              <Button
                onPress={handleSubmit}
                title="Sign In"
                disabled={!isValid}
                buttonStyle={[styles.button, styles.signInButton]}
                titleStyle={styles.signInButtonText}
              ></Button>
            </>
          )}
        </Formik>
        <Button
          title="Don't have an account?"
          onPress={() => navigation.navigate('Register')}
          buttonStyle={[styles.button, styles.registerButton]}
          titleStyle={styles.registerButtonText}
        ></Button>

        <Text style={styles.copyright}>Copyright 2020 &copy; Jobsfree</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c7ffd6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingHorizontal: 40,
  },
  level: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 25,
  },
  link: {
    fontFamily: 'Roboto-Regular',
    alignSelf: 'flex-start',
    marginTop: 50,
    marginBottom: 25,
    textTransform: 'uppercase',
  },
  label: {
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: '#333',
  },
  input: {
    backgroundColor: '#eee',
    marginTop: 15,
    borderRadius: 5,
    padding: 10,
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 25,
  },
  signInButton: {
    backgroundColor: '#3FA578',
  },
  signInButtonText: {
    color: '#eee',
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#96ffb2',
  },
  registerButtonText: {
    color: '#333',
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
  },
  copyright: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffb0bd',
    padding: 10,
    marginTop: -15,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'stretch',
  },
  errorMessage: {
    textTransform: 'uppercase',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
});
