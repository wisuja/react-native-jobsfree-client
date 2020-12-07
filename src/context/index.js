import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Toast from 'react-native-toast-message';

const Context = React.createContext();
class Provider extends Component {
  state = {
    url: 'https://tes.dumdumbros.com',
    error: {
      message: '',
    },
    user: {
      id: '',
      name: '',
      email: '',
      phone_no: '',
      isLoggedIn: false,
      photo: '',
      isBuyer: false,
      idcard_no: '',
    },
    cards: [],
    reminder: false,
    updatePasswordSuccess: false,
    editProfileSuccess: false,
  };

  login = ({ email, password }) => {
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

    axios
      .post(`${this.state.url}/login`, data)
      .then(
        ({
          status,
          data: { id, name, email, phone_no, image, role_id, idcard_no },
        }) => {
          if (status == 200) {
            this.setState((previousState) => ({
              user: {
                id: id,
                name: name,
                email: email,
                phone_no: phone_no,
                isLoggedIn: true,
                photo: image,
                isBuyer: role_id == 1 ? true : false,
                idcard_no: idcard_no,
              },
              error: {
                message: '',
              },
            }));

            Toast.show({
              type: 'success',
              position: 'bottom',
              text1: 'Successfully logged in.',
            });
          }
        }
      )
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

  register = ({ idNumber, id, name, email, phone, password, isBuyer }) => {
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
              id: id,
              name: name,
              email: email,
              phone_no: phone_no,
              isLoggedIn: true,
              photo: image,
              isBuyer: role_id == 1 ? true : false,
              idcard_no: idNumber,
            },
            error: {
              message: '',
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

  logout = () => {
    this.setState((previousState) => ({
      user: {
        id: '',
        name: '',
        email: '',
        phone_no: '',
        isLoggedIn: false,
        photo: '',
        isBuyer: false,
        idcard_no: '',
      },
    }));
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: "You've been logged out.",
    });
  };

  toggleReminder = (value) => {
    this.setState((previousState) => ({
      reminder: value,
    }));
  };

  fetchData = () => {
    axios
      .get(`${this.state.url}/lapak`)
      .then(({ data }) => {
        this.setState((previousState) => ({
          cards: data,
        }));
      })
      .catch((error) => console.error(error.response));
  };

  orderLapak = (lapakId, freelancerId) => {
    let data = new FormData();
    data.append('lapak_id', lapakId);
    data.append('freelancer_id', freelancerId);
    data.append('client_id', this.state.user.id);
    data.append('payment_date', moment(new Date()).format('YYYY'));
    data.append('payment_via', 'M-BANKING');

    axios
      .post(`${this.state.url}/transaction`, data)
      .then((response) => {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Successful to add an order!',
        });
        console.log(response.data);
      })
      .catch((error) => console.error(error.response));
  };

  createLapak = ({ category_id, title, description, price_tag }) => {
    let data = new FormData();
    data.append('user_id', this.state.user.id);
    data.append('category_id', category_id);
    data.append('title', title);
    data.append('description', description);
    data.append('requirement', 'None');
    data.append('price_tag', price_tag);
    data.append('working_hours', '8-5');
    data.append('status', 'active');

    axios
      .post(`${this.state.url}/lapak`, data)
      .then((response) => {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Job successfully created!',
        });
        console.log(response.data);
      })
      .catch((error) => console.error(error.response));
  };

  selectCategory = (id) => {
    this.setState((previousState) => ({
      selectedCategoryId: id,
    }));
  };

  editProfile = ({ isBuyer, name, email, phone, idNumber }) => {
    let data = new FormData();

    data.append('role_id', isBuyer ? 1 : 2);
    data.append('name', name);
    data.append('email', email);
    data.append('phone_no', phone);
    data.append('idcard_no', idNumber);

    axios
      .put(`${this.state.url}/user/${this.state.user.id}`, data)
      .then((response) => {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Profile successfully updated!',
        });
        console.log(response.data);

        this.setState((previousState) => ({
          error: {
            message: '',
          },
          user: {
            ...previousState.user,
            idcard_no: idNumber,
            name: name,
            email: email,
            phone_no: phone,
            isBuyer: isBuyer,
          },
          editProfileSuccess: true,
        }));
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
            editProfileSuccess: false,
          });
        }
      );
  };

  updatePassword = ({ oldPassword, newPassword }) => {
    let data = new FormData();

    data.append('password', oldPassword);
    data.append('new_password', newPassword);

    axios
      .post(
        `${this.state.url}/user/update_password/${this.state.user.email}`,
        data
      )
      .then((response) => {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Password successfully changed!',
        });
        console.log(response.data);

        this.setState((previousState) => ({
          error: {
            message: '',
          },
          user: {
            id: '',
            name: '',
            email: '',
            phone_no: '',
            isLoggedIn: false,
            photo: '',
            isBuyer: false,
          },
          updatePasswordSuccess: true,
        }));
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
            updatePasswordSuccess: false,
          });
        }
      );
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
            toggleReminder: this.toggleReminder,
            fetchData: this.fetchData,
            orderLapak: this.orderLapak,
            selectCategory: this.selectCategory,
            createLapak: this.createLapak,
            updatePassword: this.updatePassword,
            editProfile: this.editProfile,
          }}
        >
          {this.props.children}
        </Context.Provider>
      </>
    );
  }
}

export { Context, Provider };
