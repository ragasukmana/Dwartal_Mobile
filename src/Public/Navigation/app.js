import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import Home from '../../Home';
import Profile from '../../Home/profile';
import EditProfile from '../../Home/editprofile';
import Logout from '../../Auth/Logout/logout';
import Cart from '../../Home/Cart/Cart';
import {connect} from 'react-redux';
import {API_HOST} from 'react-native-dotenv';

const HeaderDrawer = props => (
  <View>
    <View style={styles.header}>
      <Text style={styles.TextHeader}>Hello</Text>
      <View style={styles.PicHeaders}>
        <Image
          style={styles.PicHeader}
          source={
            !props.auth.data.pictures
              ? require('../Assets/Image/default.jpg')
              : {
                  uri: `${API_HOST}` + '/' + props.auth.data.pictures,
                }
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
      navigationOptions: {
        drawerIcon: () => {
          return <Icon name="home" type="feather" />;
        },
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerIcon: () => {
          return <Icon name="person-outline" />;
        },
      },
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        drawerIcon: () => {
          return <Icon name="shopping-cart" type="feather" />;
        },
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerIcon: () => {
          return <Icon name="log-out" type="feather" />;
        },
      },
    },
  },
  {
    contentComponent: HeaderDrawers,
    contentOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'black',
    },
  },
);
