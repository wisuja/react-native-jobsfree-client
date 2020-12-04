import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'formik';

const Context = React.createContext();
class Provider extends Component {
  state = {
    url: 'https://tes.dumdumbros.com',
    error: {
      message: '',
    },
  };

  login = ({ email, password }) => {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

    axios
      .post(`${this.state.url}/login`, data)
      .then((response) => console.log(response.data))
      .catch(
        ({
          response: {
            data: {
              messages: { error },
            },
          },
        }) => {
          this.setState({
            error: {
              message: error,
            },
          });
        }
      );
  };

  register = ({ idNumber, name, email, phone, password, isBuyer }) => {
    let data = new FormData();
    data.append('role_id', isBuyer ? 1 : 2);
    data.append('idcard_no', idNumber);
    data.append('name', name);
    data.append('email', email);
    data.append('phone_no', phone);
    data.append('password', password);

    axios
      .post(`${this.state.url}/signup`, data)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <>
        <Context.Provider
          value={{
            state: this.state,
            login: this.login,
            register: this.register,
          }}
        >
          {this.props.children}
        </Context.Provider>
      </>
    );
  }
}

export { Context, Provider };
