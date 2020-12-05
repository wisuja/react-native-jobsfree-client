import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
class Provider extends Component {
  state = {
    url: 'https://tes.dumdumbros.com',
    error: {
      message: '',
    },
    user: {
      name: '',
      email: '',
      phone_no: '',
      isLoggedIn: false,
      photo: '',
      isBuyer: false,
    },
    cards: [],
  };

  login = ({ email, password }) => {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

    axios
      .post(`${this.state.url}/login`, data)
      .then(({ status, data: { name, email, phone_no, image, role_id } }) => {
        if (status == 200) {
          this.setState((previousState) => ({
            user: {
              name: name,
              email: email,
              phone_no: phone_no,
              isLoggedIn: true,
              photo: image,
              isBuyer: role_id == 1 ? true : false,
            },
          }));
        }
      })
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
      .then(({ status, data: { name, email, phone_no, image, role_id } }) => {
        if (status == 200) {
          this.setState((previousState) => ({
            user: {
              name: name,
              email: email,
              phone_no: phone_no,
              isLoggedIn: true,
              photo: image,
              isBuyer: role_id == 1 ? true : false,
            },
          }));
        }
      })
      .catch((error) => console.error(error));
  };

  logout = () => {
    this.setState((previousState) => ({
      user: {
        name: '',
        email: '',
        phone_no: '',
        isLoggedIn: false,
        photo: '',
        isBuyer: false,
      },
    }));
  };

  render() {
    return (
      <>
        <Context.Provider
          value={{
            state: this.state,
            login: this.login,
            register: this.register,
            logout: this.logout,
          }}
        >
          {this.props.children}
        </Context.Provider>
      </>
    );
  }
}

export { Context, Provider };
