import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-elements';

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
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { resetForm, validate }) => {
            validate(values);
            register(values);
            resetForm();
          }}
          validationSchema={Yup.object().shape({
            idNumber: Yup.number().required('ID Number cannot be empty'),
            name: Yup.string().required('Name cannot be empty'),
            email: Yup.string()
              .email('Please insert a valid email')
              .required('Email cannot be empty'),
            phone: Yup.string()
              .required('Phone number cannot be empty')
              .min(11, 'Minimal 11 numbers')
              .max(13, 'Maximal 13 numbers'),
            password: Yup.string()
              .required('Password cannot be empty')
              .min(8, 'Minimal 8 characters'),
            passwordConfirmation: Yup.string()
              .required('Password confirmation cannot be empty')
              .test(
                'passwords-match',
                'passwords must match',
                function (value) {
                  return this.parent.password == value;
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
              <ScrollView showsVerticalScrollIndicator={false}>
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
                <Text style={styles.label}>Password</Text>
                <TextInput
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  style={styles.input}
                  secureTextEntry={true}
                />
                {touched.password && errors.password && (
                  <Text style={{ fontSize: 10, color: 'red' }}>
                    {errors.password}
                  </Text>
                )}
                <Text style={styles.label}>Password Confirmation</Text>
                <TextInput
                  value={values.passwordConfirmation}
                  onChangeText={handleChange('passwordConfirmation')}
                  onBlur={() => setFieldTouched('passwordConfirmation')}
                  style={styles.input}
                  secureTextEntry={true}
                />
                {touched.passwordConfirmation &&
                  errors.passwordConfirmation && (
                    <Text style={{ fontSize: 10, color: 'red' }}>
                      {errors.passwordConfirmation}
                    </Text>
                  )}
              </ScrollView>
              <Button
                onPress={handleSubmit}
                title="Sign Up"
                disabled={!isValid}
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
    width: 300,
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
