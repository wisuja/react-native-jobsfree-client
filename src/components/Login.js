import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from 'react-native-elements';

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
          onSubmit={(values, { resetForm }) => {
            login(values);
            resetForm();
          }}
          validationSchema={Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          })}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <Text style={styles.label}>email</Text>
              <Input
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={errors.email}
                renderErrorMessage={errors.email && touched.email}
                style={styles.input}
                underlineColorAndroid="transparent"
              ></Input>
              <Text style={styles.label}>Password</Text>
              <Input
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={errors.password}
                renderErrorMessage={errors.password && touched.password}
                secureTextEntry={true}
                style={styles.input}
                underlineColorAndroid="transparent"
              ></Input>
              <Button
                onPress={handleSubmit}
                title="Sign In"
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
    width: 275,
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
    marginLeft: 25,
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
  },
  button: {
    width: 275,
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
    marginTop: 'auto',
    marginBottom: 20,
  },
});
