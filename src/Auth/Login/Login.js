import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Text,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Icon} from 'native-base';
import axios from 'axios';
import qs from 'qs';
import {connect} from 'react-redux';

class Login extends Component {
  static navigationOptions = {headerShown: false};
  state = {
    username: '',
    password: '',
  };

  handleInput = (text, type) => {
    this.setState({[type]: text});
  };

  handleLogin = () => {
    const {username, password} = this.state;
    const body = {
      username,
      password,
    };
    if (username === '' || password === '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please input your account data',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        150,
      );
    } else {
      axios
        .post('http://127.0.0.1:3003/user/login', qs.stringify(body))
        .then(response => {
          if (response.status === 200) {
            this.props.navigation.navigate('App');
            this.props.setDataLogin(response.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  handleRegis = () => {
    this.props.navigation.navigate('Regis');
  };
  render() {
    return (
      <View>
        <View>
          <ImageBackground
            style={styles.header}
            source={require('../../Public/Assets/Image/yellowbackground.jpg')}>
            <ScrollView>
              <View style={styles.headerlogo}>
                <Image
                  style={styles.logo}
                  source={require('../../Public/Assets/Image/wartallogo.png')}
                />
                <Text style={styles.textWelcome}>Welcome to Dwartal</Text>
                <Text style={styles.textInput}>
                  Please Input your Data Account
                </Text>
                <Text style={styles.signinText}>Sign In</Text>
              </View>
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
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this.handleLogin()}>
                    <View style={styles.buttonLogin}>
                      <Text style={styles.TextLogin}>LOGIN</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.Signup}>
                <TouchableOpacity onPress={() => this.handleRegis()}>
                  <Text style={styles.TextSignup}>
                    Don't Have Account ? SignUp Here
                  </Text>
                </TouchableOpacity>
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
)(Login);

const styles = StyleSheet.create({
  header: {
    height: '100%',
    width: '100%',
    opacity: 0.85,
  },
  textWelcome: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 14,
  },
  containerData: {
    margin: 16,
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 4,
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
    marginTop: 20,
  },
  textusername: {
    marginBottom: 15,
    borderRadius: 30,
    backgroundColor: '#d9d5d4',
    paddingLeft: 15,
  },
  textpassword: {
    backgroundColor: '#d9d5d4',
    marginBottom: 5,
    borderRadius: 30,
    paddingLeft: 15,
  },
  buttonLogin: {
    marginTop: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 30,
    backgroundColor: 'orange',
  },
  Signup: {
    alignItems: 'center',
    marginTop: 15,
  },
  TextSignup: {
    fontSize: 14,
    padding: 2,
    fontWeight: 'bold',
  },
  containerInpuData: {
    marginTop: 8,
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
  signinText: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
  },
});
