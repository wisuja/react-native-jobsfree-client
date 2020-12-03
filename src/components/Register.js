import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from 'react-native-elements';

import { Context } from '../context';

export default function Register({ navigation }) {
  const { register } = useContext(Context);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require('../assets/img/logo.png')} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.level}>
          <Text style={styles.link}>Sign Up</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Back To Login</Text>
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={{
            idNumber: '',
            name: '',
            email: '',
            phone: '',
            password: '',
            passwordConfirmation: '',
          }}
          onSubmit={(values, { resetForm }) => {
            register(values);
            resetForm();
          }}
          validationSchema={Yup.object({
            idNumber: Yup.number().required(),
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            phone: Yup.string().required().min(11).max(13),
            password: Yup.string().required().min(8),
            passwordConfirmation: Yup.string().oneOf(
              [Yup.ref('password'), null],
              'passwords must match'
            ),
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
              <Text style={styles.label}>ID Number</Text>
              <Input
                onChange={handleChange('idNumber')}
                onBlur={handleBlur('idNumber')}
                value={values.idNumber}
                errorMessage={errors.idNumber}
                renderErrorMessage={errors.idNumber && touched.idNumber}
                style={styles.input}
                underlineColorAndroid="transparent"
              ></Input>
              <Text style={styles.label}>Name</Text>
              <Input
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                errorMessage={errors.name}
                renderErrorMessage={errors.name && touched.name}
                style={styles.input}
                underlineColorAndroid="transparent"
              ></Input>
              <Text style={styles.label}>Email</Text>
              <Input
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={errors.email}
                renderErrorMessage={errors.email && touched.email}
                style={styles.input}
                underlineColorAndroid="transparent"
              ></Input>
              <Text style={styles.label}>Phone</Text>
              <Input
                onChange={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                errorMessage={errors.phone}
                renderErrorMessage={errors.phone && touched.phone}
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
                style={styles.input}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
              ></Input>
              <Text style={styles.label}>Password Confirmation</Text>
              <Input
                onChange={handleChange('passwordConfirmation')}
                onBlur={handleBlur('passwordConfirmation')}
                value={values.passwordConfirmation}
                errorMessage={errors.passwordConfirmation}
                secureTextEntry={true}
                renderErrorMessage={
                  errors.passwordConfirmation && touched.passwordConfirmation
                }
                style={styles.input}
                underlineColorAndroid="transparent"
              ></Input>
              <Button
                onPress={handleSubmit}
                title="Sign Up"
                buttonStyle={[styles.button, styles.signUpButton]}
                titleStyle={styles.signUpButtonText}
              ></Button>
            </>
          )}
        </Formik>
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
  level: {
    width: 275,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  signUpButton: {
    backgroundColor: '#3FA578',
  },
  signUpButtonText: {
    color: '#eee',
    textTransform: 'uppercase',
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
