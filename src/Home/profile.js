import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import Moment from 'moment';
import getUser from './reduxProfile/actionuser';
import ProfileScreen from '../Public/Component/ProfileScreen';

class Profile extends Component {
  static navigationOptions = props => ({
    header: <ProfileScreen {...props} />,
  });
  componentDidMount() {
    this.props.getAllUser();
  }
  handleHome = () => {
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <View>
        <View>
          <Image
            style={styles.header}
            source={require('../Public/Assets/Image/yellowbackground.jpg')}
          />
          <Image
            style={styles.avatar}
            source={
              this.props.auth.data.pictures === undefined ||
              this.props.auth.data.pictures === null
                ? require('../Public/Assets/Image/default.jpg')
                : {
                    uri:
                      'http://localhost:3003/' + this.props.auth.data.pictures,
                  }
            }
          />
        </View>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.nameProfile}>{this.props.auth.data.name}</Text>
            <Text style={styles.info}>
              {this.props.auth.data.role === 0 ? 'Member' : 'Member'}
            </Text>
            <Text style={styles.description}> Join Date</Text>
            <Text style={styles.description}>
              {Moment(this.props.auth.data.create_date).format('MMMM Do YYYY')}
            </Text>
          </View>
        </View>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);

const styles = StyleSheet.create({
  header: {
    height: 320,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 70,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  nameProfile: {
    bottom: 30,
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
  },
  info: {
    fontSize: 20,
    color: '#FDA320',
    marginTop: 5,
    bottom: 30,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 5,
    textAlign: 'center',
  },
  buttonProfile: {
    marginTop: 30,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 150,
    backgroundColor: '#FDA320',
    borderRadius: 25,
  },
  buttonPassword: {
    marginTop: 5,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 150,
    backgroundColor: '#FDA320',
    borderRadius: 25,
  },
});
