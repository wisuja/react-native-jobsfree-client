import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

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
      orders: [],
    },
    cards: [],
    reminder: false,
    updatePasswordSuccess: false,
    editProfileSuccess: false,
  };

  async componentDidMount() {
    const userData = await this.getUserData();

    if (userData !== null) {
      this.setState((previousState) => ({
        user: userData,
      }));
    }

    const reminder = await this.getReminder();
    if (reminder !== null) {
      this.setState((previousState) => ({
        reminder: reminder,
      }));
    }
  }

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
                ...previousState.user,
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
      .then(() => this.saveUserData())
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
              ...previousState.user,
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
      .then(() => this.saveUserData())
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
        orders: [],
      },
    }));
    this.removeUserData();

    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Thank you for using our application.',
    });
  };

  toggleReminder = (value) => {
    this.setState((previousState) => ({
      reminder: value,
    }));

    this.saveReminder();

    if (!this.state.reminder) {
      this.pushNotification();
    } else {
      this.cancelNotification();
    }
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

  fetchOrders = () => {
    let { url, user } = this.state;

    axios
      .get(`${url}/transaction/ongoing/${user.id}`)
      .then(({ data }) => {
        this.setState((previousState) => ({
          user: {
            ...previousState.user,
            orders: data,
          },
        }));
      })
      .catch((error) => {
        console.log(error.response);
      });
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
      .then(({ data }) => {
        console.log(data);
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Job successfully created!',
        });
        this.setState((previousState) => ({
          cards: [...previousState.cards, data],
        }));
      })
      .catch((error) => console.error(error.response));
  };

  updateLapak = ({ id, category_id, title, description, price_tag }) => {
    let data = {
      user_id: this.state.user.id,
      category_id,
      title,
      description,
      requirement: 'None',
      price_tag,
      working_hours: '8-5',
      status: 'active',
    };
    axios
      .put(`${this.state.url}/lapak/${id}`, qs.stringify(data), {
        headers: {
          'Content-Type': 'x-www-form-urlencoded',
        },
      })
      .then(({ data }) => {
        console.log(data);

        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Job successfully updated!',
        });

        this.setState((previousState) => ({
          cards: previousState.cards.map((card) =>
            card.id == id
              ? { ...card, title, description, price_tag, category_id }
              : card
          ),
        }));
      })
      .catch((error) => console.error(error.response));
  };

  deleteLapak = (lapak_id) => {
    axios
      .delete(`${this.state.url}/lapak/${lapak_id}`)
      .then(({ data }) => {
        console.log(data);

        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Job successfully deleted!',
        });

        this.setState((previousState) => ({
          cards: previousState.cards.filter((card) => card.id !== lapak_id),
        }));
      })
      .catch((error) => console.error(error.response));
  };

  selectCategory = (id) => {
    this.setState((previousState) => ({
      selectedCategoryId: id,
    }));
  };

  editProfile = ({ isBuyer, name, email, phone, idNumber }) => {
    let data = {
      role_id: isBuyer ? 1 : 2,
      name: name,
      email: email,
      phone_no: phone,
      idcard_no: idNumber,
    };

    axios
      .put(`${this.state.url}/user/${this.state.user.id}`, qs.stringify(data), {
        headers: {
          'Content-Type': 'x-www-form-urlencoded',
        },
      })
      .then((response) => {
        console.log(response.data);

        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Profile successfully updated!',
        });

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
      .then(() => this.saveUserData())
      .catch(({ response }) => {
        console.error(response);
        this.setState({
          error: {
            message: 'Something went wrong.',
          },
          editProfileSuccess: false,
        });
      });
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
            orders: [],
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

  confirmOrder = (id) => {
    let data = new FormData();
    data.append('accept', 1);

    axios
      .post(`${this.state.url}/transaction/confirm/${id}`, data)
      .then(({ data }) => {
        console.log(data);
        this.setState((previousState) => ({
          user: {
            ...previousState.user,
            orders: previousState.user.orders.map((order) =>
              order.id == id ? { ...order, accept: 1 } : order
            ),
          },
        }));

        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Order confirmed!',
        });
      })
      .catch((error) => console.error(error.response));
  };

  submitOrder = ({ id, message }) => {
    let data = new FormData();
    data.append('message', message);

    axios
      .post(`${this.state.url}/transaction/submit/${id}`, data)
      .then(({ data }) => {
        console.log(data);

        this.setState((previousState) => ({
          user: {
            ...previousState.user,
            orders: previousState.user.orders.map((order) =>
              order.id == id ? { ...order, message } : order
            ),
          },
        }));

        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Job submitted!',
        });
      })
      .catch((error) => console.log(error.response));
  };

  cancelOrder = (id) => {
    let data = new FormData();
    data.append('accept', 2);

    axios
      .post(`${this.state.url}/transaction/confirm/${id}`, data)
      .then(({ data }) => {
        console.log(data);
        this.setState((previousState) => ({
          user: {
            ...previousState.user,
            orders: previousState.user.orders.filter(
              (order) => order.id !== id
            ),
          },
        }));

        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Order cancelled',
        });
      })
      .catch((error) => console.error(error.response));
  };

  doneOrder = (id) => {
    let data = new FormData();
    data.append('status', 'ok');

    axios
      .post(`${this.state.url}/transaction/done/${id}`, data)
      .then(({ data }) => {
        console.log(data);

        this.setState((previousState) => ({
          user: {
            ...previousState.user,
            orders: previousState.user.orders.filter(
              (order) => order.id !== id
            ),
          },
        }));

        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: "It's a pleasure to work with you.",
        });
      })
      .then((error) => console.log(error));
  };

  saveUserData = async () => {
    try {
      await AsyncStorage.setItem('UserData', JSON.stringify(this.state.user));
    } catch (error) {
      console.error(error);
    }
  };

  getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('UserData');

      return userData !== null ? JSON.parse(userData) : null;
    } catch (error) {
      console.error(error);
    }
  };

  removeUserData = async () => {
    try {
      await AsyncStorage.removeItem('UserData');
    } catch (error) {
      console.error(error);
    }
  };

  saveReminder = async () => {
    try {
      await AsyncStorage.setItem(
        'Reminder',
        JSON.stringify(this.state.reminder)
      );
    } catch (error) {
      console.error(error);
    }
  };

  getReminder = async () => {
    try {
      const reminder = await AsyncStorage.getItem('Reminder');

      return reminder !== null ? JSON.parse(reminder) : null;
    } catch (error) {
      console.error(error);
    }
  };

  pushNotification = () => {
    PushNotification.localNotification({
      channelId: 'jobsfree_notifications', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      title: 'Jobsfree', // (optional)
      message: "Let's do some real work today!", // (required)
      repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    });
  };

  cancelNotification = () => {
    PushNotification.cancelAllLocalNotifications();
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
            updateLapak: this.updateLapak,
            deleteLapak: this.deleteLapak,
            updatePassword: this.updatePassword,
            editProfile: this.editProfile,
            fetchOrders: this.fetchOrders,
            cancelOrder: this.cancelOrder,
            doneOrder: this.doneOrder,
            confirmOrder: this.confirmOrder,
            submitOrder: this.submitOrder,
          }}
        >
          {this.props.children}
        </Context.Provider>
      </>
    );
  }
}

export { Context, Provider };
