import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import axios from 'axios';
import getUser from './reduxProfile/actionuser';
import EditProfileScreen from '../Public/Component/EditProfileScreen';
import {API_HOST} from 'react-native-dotenv';

class Profile extends React.Component {
  static navigationOptions = props => ({
    header: <EditProfileScreen {...props} />,
  });
  componentDidMount() {
    this.props.getAllUser();
  }

  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User Cancel Image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        this.setState({
          filePath: source,
        });
      }
    });
  };

  handleInput = (text, type) => {
    this.setState({[type]: text});
  };

  handleHome = () => {
    this.props.navigation.navigate('Home');
  };

  handleEdit = id_user => {
    if (this.state.name === undefined || this.state.password === undefined) {
      ToastAndroid.showWithGravityAndOffset(
        'All Form must fill',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        150,
      );
    } else {
      let body = new FormData();
      body.append('username', this.props.auth.data.username);
      body.append('password', this.state.password);
      body.append('name', this.state.name);
      body.append('role', this.props.auth.data.role);
      body.append('pictures', {
        uri: this.state.filePath.uri,
        type: this.state.filePath.type,
        name: this.state.filePath.fileName,
      });
      axios
        .put(`${API_HOST}/user/edituser/${id_user}`, body)
        .then(response => {
          if (response.status === 200) {
            ToastAndroid.showWithGravityAndOffset(
              'Edit Success',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              0,
              150,
            );
            console.log(response.data);
            this.props.updateProfile(response.data.data);
          }
        })
        .catch(err => {
          ToastAndroid.showWithGravityAndOffset(
            'Photo must less than 3 Mb and photo type only (jpg,png,jpeg)',
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
        <ScrollView>
          <View>
            <Image
              style={styles.header}
              source={require('../Public/Assets/Image/yellowbackground.jpg')}
            />
            <View style={styles.headerpic}>
              <TouchableOpacity
                onPress={this.chooseFile}
                style={styles.headerAvatar}>
                <Image
                  onChangeText={text => this.handleInput(text, 'pictures')}
                  style={styles.avatar}
                  source={
                    this.state.filePath.uri
                      ? this.state.filePath
                      : this.props.auth.data.pictures === null
                      ? require('../Public/Assets/Image/default.jpg')
                      : {
                          uri:
                            'http://localhost:3003/' +
                            this.props.auth.data.pictures,
                        }
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.nameProfile}>
                {this.props.auth.data.name}
              </Text>
              <TextInput
                style={styles.InputEdit}
                placeholder="New Name Account"
                onChangeText={text => this.handleInput(text, 'name')}
              />
              <TextInput
                secureTextEntry
                style={styles.InputEdit}
                placeholder="New Password"
                onChangeText={text => this.handleInput(text, 'password')}
              />
              <TouchableOpacity
                onPress={() => this.handleEdit(this.props.auth.data.id_user)}
                style={styles.buttonProfile}>
                <Text style={styles.TextSubmit}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    dataUser: state.dataUser,
  };
};

const mapDispatchToProps = dispatch => ({
  getAllUser: payload => dispatch(getUser(payload)),
  updateProfile: payload => dispatch({type: 'UPDATE_DATA_PROFILE', payload}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

const styles = StyleSheet.create({
  header: {
    height: 200,
    alignItems: 'center',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
  },
  headerpic: {
    bottom: 170,
  },
  headerAvatar: {
    flex: 1,
  },
  body: {
    bottom: 100,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  buttonProfile: {
    bottom: 30,
    marginTop: 15,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 150,
    backgroundColor: '#FDA320',
    borderRadius: 25,
  },
  InputEdit: {
    bottom: 30,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    width: 250,
    height: 45,
    borderRadius: 18,
    borderColor: '#FDA320',
    borderWidth: 3,
    paddingLeft: 15,
  },
  nameProfile: {
    fontSize: 25,
    bottom: 50,
    color: '#696969',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#696969',
    marginTop: 5,
    textAlign: 'center',
    marginBottom: 2,
  },
  ButtonImages: {
    paddingVertical: 20,
    bottom: 30,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 250,
    borderColor: '#FDA320',
    borderRadius: 18,
    borderWidth: 3,
  },
  TextSubmit: {
    color: 'white',
  },
});
