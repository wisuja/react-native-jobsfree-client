import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

class Provider extends Component {
  state = {
    email: '',
    url: 'http://tes.dumdumbros.com',
  };

  login = ({ email, password }) => {
    axios
      .post(`${this.state.url}/login`, {
        email,
        password,
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  };

  register = (values) => {
    console.log(values);
    // axios
    //   .post(`${this.state.url}/login`, {
    //     email,
    //     password,
    //   })
    //   .then((response) => console.log(response))
    //   .catch((error) => console.error(error));
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
