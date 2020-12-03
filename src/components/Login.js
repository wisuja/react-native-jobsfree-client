import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-elements';

import { Context } from '../context';

export default function Login({ navigation }) {
  const { login } = useContext(Context);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require('../assets/img/logo.png')} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.level}>
          <Text style={styles.link}>Sign In</Text>
        </View>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, { resetForm, validate }) => {
            validate(values);
            login(values);
            resetForm();
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Please insert a valid email')
              .required('Email cannot be empty'),
            password: Yup.string()
              .required('Password cannot be empty')
              .min(8, 'Minimal 8 characters'),
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
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={values.email}
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                style={styles.input}
              />
              {touched.email && errors.email && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.email}
                </Text>
              )}
              <Text style={styles.label}>Password</Text>
              <TextInput
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                style={styles.input}
              />
              {touched.password && errors.password && (
                <Text style={{ fontSize: 10, color: 'red' }}>
                  {errors.password}
                </Text>
              )}
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
      </View>
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
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 2,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    alignItems: 'center',
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
    marginTop: 25,
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
  },
});
