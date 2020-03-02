import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {Text, Icon} from 'native-base';
import axios from 'axios';
import {connect} from 'react-redux';
import {API_HOST} from 'react-native-dotenv';

class Regis extends Component {
  static navigationOptions = {headerShown: false};
  state = {
    username: '',
    password: '',
    name: '',
    role: 0,
  };

  handleInput = (text, type) => {
    this.setState({[type]: text});
  };
  handleLogin = () => {
    this.props.navigation.navigate('Login');
  };
  handleSubmitRegis = () => {
    const {username, password, name, role} = this.state;
    const body = {
      username,
      password,
      name,
      role,
    };
    if (
      this.state.username === '' ||
      this.state.password === '' ||
      this.state.name === ''
    ) {
      ToastAndroid.showWithGravityAndOffset(
        'All form must fill',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        150,
      );
    } else {
      axios
        .post(`${API_HOST}/user/registration`, body)
        .then(response => {
          if (response.status === 200) {
            ToastAndroid.showWithGravityAndOffset(
              'Signup success, please go to login page',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              0,
              150,
            );
          }
        })
        .catch(err => {
          ToastAndroid.showWithGravityAndOffset(
            'Error username has already set',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            0,
            150,
          );
          console.log(err);
        });
    }
  };
  render() {
    return (
      <View>
        <View>
          <ImageBackground
            style={styles.header}
            source={require('../../Public/Assets/Image/yellowbackground.jpg')}>
            <ScrollView>
              <View style={styles.container}>
                <View style={styles.headIconArrow}>
                  <TouchableOpacity onPress={() => this.handleLogin()}>
                    <Icon
                      style={styles.iconArrow}
                      name="ios-arrow-back"
                      type="Ionicons"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.signup}>
                  <Text style={styles.textWelcome}>Sign Up</Text>
                </View>
              </View>
              <TouchableOpacity>
                <View style={styles.headerlogo}>
                  <Image
                    style={styles.logo}
                    source={require('../../Public/Assets/Image/wartallogo.png')}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.containerData}>
                <View style={styles.containerInpuData}>
                  <View>
                    <TextInput
                      TextInput
                      placeholder={'Username...'}
                      onChangeText={text => this.handleInput(text, 'username')}
                      style={styles.textusername}
                    />
                    <Icon
                      style={styles.iconUsername}
                      name="person"
                      type="MaterialIcons"
                    />
                  </View>
                  <View>
                    <TextInput
                      TextInput
                      placeholder={'Password...'}
                      onChangeText={text => this.handleInput(text, 'password')}
                      style={styles.textpassword}
                      secureTextEntry
                    />
                    <Icon
                      style={styles.iconPassword}
                      name="vpn-key"
                      type="MaterialIcons"
                    />
                  </View>
                  <View>
                    <TextInput
                      TextInput
                      placeholder={'Account Name...'}
                      onChangeText={text => this.handleInput(text, 'name')}
                      style={styles.textname}
                    />
                    <Icon
                      style={styles.iconUsername}
                      name="md-contact"
                      type="Ionicons"
                    />
                  </View>
                  <TouchableOpacity onPress={() => this.handleSubmitRegis()}>
                    <View style={styles.buttonLogin}>
                      <Text style={styles.TextLogin}>SignUp</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  setDataLogin: payload =>
    dispatch({
      type: 'POST_LOGIN_FULFILLED',
      payload,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Regis);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  header: {
    height: '100%',
    width: '100%',
    opacity: 0.85,
  },
  textWelcome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  signup: {
    top: 15,
    left: 110,
    alignSelf: 'center',
  },
  textInput: {
    fontSize: 14,
  },
  containerData: {
    margin: 16,
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 4,
    bottom: 40,
    borderRadius: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  headerlogo: {
    alignItems: 'center',
    margin: 16,
    padding: 16,
    marginTop: 30,
  },
  textusername: {
    marginBottom: 15,
    borderRadius: 30,
    backgroundColor: '#d9d5d4',
    paddingLeft: 15,
  },
  textpassword: {
    backgroundColor: '#d9d5d4',
    marginBottom: 15,
    borderRadius: 30,
    paddingLeft: 15,
  },
  textname: {
    marginBottom: 15,
    borderRadius: 30,
    backgroundColor: '#d9d5d4',
    paddingLeft: 15,
  },
  buttonLogin: {
    marginTop: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 30,
    backgroundColor: 'orange',
  },
  containerInpuData: {
    padding: 16,
  },
  TextLogin: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  iconUsername: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconPassword: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconArrow: {
    fontSize: 35,
  },
  headIconArrow: {
    margin: 10,
    top: 15,
    left: 10,
  },
});
