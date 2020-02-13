import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {View, Text, StyleSheet, Image} from 'react-native';
import Home from '../../Home';
import Profile from '../../Home/profile';
import EditProfile from '../../Home/editprofile';
import Logout from '../../Auth/Logout/logout';
import Cart from '../../Home/Cart/Cart';
import {connect} from 'react-redux';

const HeaderDrawer = props => (
  <View>
    <View style={styles.header}>
      <Text style={styles.TextHeader}>Hello</Text>
      <View style={styles.PicHeaders}>
        <Image
          style={styles.PicHeader}
          source={
            props.auth.data.pictures === undefined ||
            props.auth.data.pictures === null
              ? require('../Assets/Image/default.jpg')
              : {uri: 'http://localhost:3003/' + props.auth.data.pictures}
          }
        />
      </View>
      <View>
        <Text style={styles.TextName}>{props.auth.data.name}</Text>
      </View>
    </View>
    <DrawerItems {...props} />
  </View>
);
const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const HeaderDrawers = connect(mapStateToProps)(HeaderDrawer);

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'orange',
    opacity: 0.9,
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 4,
  },
  TextName: {
    fontWeight: 'bold',
    marginTop: 3,
    marginBottom: 5,
  },
  PicHeaders: {
    alignItems: 'center',
  },
  TextHeader: {
    alignSelf: 'center',
    marginTop: 2,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  PicHeader: {
    width: 130,
    height: 130,
    borderRadius: 80,
  },
});

const Homescreen = createStackNavigator({
  Home: {
    screen: Home,
  },
});

const CartScreen = createStackNavigator({
  Cart: {
    screen: Cart,
  },
});

const ProfileScreen = createStackNavigator({
  Profile: {
    screen: Profile,
  },
  EditProfile: {
    screen: EditProfile,
  },
});

export default createDrawerNavigator(
  {
    Home: {
      screen: Homescreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    Cart: {
      screen: CartScreen,
    },
    Logout: {
      screen: Logout,
    },
  },
  {
    contentComponent: HeaderDrawers,
  },
);
