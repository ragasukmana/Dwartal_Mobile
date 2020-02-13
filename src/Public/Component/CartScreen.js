import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Text} from 'native-base';
import {connect} from 'react-redux';
import {emptyCart} from '../../Home/Cart/action';

class CartScreen extends Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.content1}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Icon style={styles.icon} name="ios-arrow-back" type="Ionicons" />
          </TouchableOpacity>
        </View>
        <View style={styles.content2}>
          <Text style={styles.TextCart}>Cart</Text>
        </View>
        <View style={styles.content3}>
          <TouchableOpacity
            onPress={() => {
              this.props.dispatch(emptyCart(this.props.ListCart.cartList));
              this.props.navigation.navigate('Home');
            }}>
            <Text style={styles.TextCancel}>Cancel</Text>
          </TouchableOpacity>
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
    borderRadius: 15,
    backgroundColor: '#ab0a0a',
  },
  Modal: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  TextCart: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  TextCancel: {
    fontSize: 14,
    color: 'white',
  },
});
