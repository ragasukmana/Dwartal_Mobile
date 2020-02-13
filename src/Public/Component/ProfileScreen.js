import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Text} from 'native-base';
import {connect} from 'react-redux';

class CartScreen extends Component {
  handleEditProfile = () => {
    this.props.navigation.navigate('EditProfile');
  };
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.content1}>
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon style={styles.icon} name="md-menu" type="Ionicons" />
          </TouchableOpacity>
        </View>
        <View style={styles.content2}>
          <Text style={styles.TextCart}>My Profile</Text>
        </View>
        <View style={styles.content3}>
          <TouchableOpacity onPress={() => this.handleEditProfile()}>
            <Text style={styles.TextEdit}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    ListCart: state.ListCart,
  };
};

export default connect(mapStateToProps)(CartScreen);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0eded',
    padding: 16,
    elevation: 5,
  },
  content1: {
    flex: 0.2,
    alignItems: 'center',
  },
  content2: {
    flex: 0.7,
    marginHorizontal: 16,
  },
  content3: {
    flex: 0.2,
    alignItems: 'center',
    padding: 6,
    borderRadius: 20,
    // backgroundColor: 'orange',
  },
  Modal: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  TextCart: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  TextEdit: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
