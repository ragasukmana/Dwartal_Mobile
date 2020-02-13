import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Text} from 'native-base';
import {connect} from 'react-redux';

class CartScreen extends Component {
  handleProfile = () => {
    this.props.navigation.navigate('Profile');
  };
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.content1}>
          <TouchableOpacity onPress={() => this.handleProfile()}>
            <Icon style={styles.icon} name="ios-arrow-back" type="Ionicons" />
          </TouchableOpacity>
        </View>
        <View style={styles.content2}>
          <Text style={styles.TextCart}>Edit Profile</Text>
        </View>
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
    padding: 4,
    borderRadius: 10,
    backgroundColor: 'orange',
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
    color: 'white',
  },
});
