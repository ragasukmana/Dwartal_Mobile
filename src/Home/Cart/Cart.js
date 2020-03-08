import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Text, Icon} from 'native-base';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import {
  removeCart,
  increaseQty,
  decreseQty,
  createOrder,
  emptyCart,
} from './action';
import CartSreen from '../../Public/Component/CartScreen';
import Modal, {ModalTitle} from 'react-native-modals';
import {API_HOST} from 'react-native-dotenv';
import toast from '../../Public/Component/toast';

class Cart extends Component {
  static navigationOptions = props => ({
    header: <CartSreen {...props} />,
  });

  state = {
    modalTakeOrders: false,
  };

  handleTakeOut = () => {
    const body = {
      user_id: this.props.auth.data.id_user,
      order: this.props.ListCart.cartList,
    };
    this.setState({modalTakeOrders: true});
    this.props
      .dispatch(createOrder(body))
      .then(response => {
        toast('Order Set, Thank You');
      })
      .catch(error => {
        console.log(error);
        toast('Order Failed');
      });
  };
  render() {
    return this.props.ListCart.cartList.length === 0 ? (
      <Image
        style={styles.imageEmpty}
        source={require('../../Public/Assets/Image/empty-cart.png')}
      />
    ) : (
      <View style={styles.Header}>
        <View style={styles.SubHeader}>
          <ScrollView style={styles.ScrollView}>
            {this.props.ListCart.cartList.map((item, index) => {
              return (
                <View style={styles.HeaderProduct}>
                  <View>
                    <Image
                      style={styles.PicProduct}
                      source={{
                        uri: `${API_HOST}` + '/' + item.image,
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.NameProduct}>{item.name_product}</Text>
                    <NumberFormat
                      value={item.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp'}
                      renderText={value => (
                        <Text style={styles.PriceProduct}>{value}</Text>
                      )}
                    />
                    <View style={styles.HeaderOrder}>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.dispatch(increaseQty(item));
                        }}>
                        <View style={styles.AddOrder}>
                          <Icon
                            name="ios-add"
                            type="Ionicons"
                            style={styles.FontAddOrder}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.HeaderQuantity}>
                        <Text style={styles.Quantity}>{item.quantity}</Text>
                      </View>
                      {item.quantity === 1 ? (
                        <TouchableOpacity
                          onPress={() => {
                            this.props.dispatch(removeCart(item));
                          }}>
                          <View style={styles.MinOrder}>
                            <Icon
                              name="ios-remove"
                              type="Ionicons"
                              style={styles.MinOrderCondt1}
                            />
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            this.props.dispatch(decreseQty(item));
                          }}>
                          <View style={styles.HeaderMinCond2}>
                            <Icon
                              name="ios-remove"
                              type="Ionicons"
                              style={styles.MinOrderCond2}
                            />
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.HeaderTotal}>
            <Text style={styles.TextTotalPrice}>Total Price</Text>
            <NumberFormat
              value={
                this.props.ListCart.grandTotal * 0.1 +
                this.props.ListCart.grandTotal
              }
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp'}
              renderText={value => (
                <Text style={styles.TextPrice}>{value}</Text>
              )}
            />
            <Text style={styles.TextTax}>Include tax 10%</Text>
            <TouchableOpacity
              onPress={() => {
                this.handleTakeOut();
              }}>
              <View style={styles.HeaderTakeOrder}>
                <Text style={styles.TextOrder}>Take Orders</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Modal
            transparent={false}
            width={0.8}
            height={0.8}
            visible={this.state.modalTakeOrders}
            onTouchOutside={() => {
              this.setState({modalTakeOrders: false});
            }}
            onDismiss={() => {
              this.props.dispatch(emptyCart(this.props.ListCart.cartList));
            }}
            modalTitle={<ModalTitle title="Invoice" align="center" />}>
            <ScrollView>
              {this.props.ListCart.cartList.map((item, index) => {
                return (
                  <View style={styles.listInvoice}>
                    <View style={styles.nameInvoice}>
                      <Text style={styles.textnameInvoice}>
                        {item.name_product}
                      </Text>
                    </View>
                    <View style={styles.Quantityinvoice}>
                      <Text style={styles.textQuantity}>{item.quantity} X</Text>
                      <NumberFormat
                        value={item.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp'}
                        renderText={value => (
                          <Text style={styles.textPriceInvoice}> {value}</Text>
                        )}
                      />
                    </View>
                    <View style={styles.invoTotalPrice}>
                      <NumberFormat
                        value={item.totalPrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp'}
                        renderText={value => <Text>{value}</Text>}
                      />
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            <View style={styles.HeaderGrandTotal}>
              <Text style={styles.GrandTotal}>Grand Total</Text>
              <NumberFormat
                value={
                  this.props.ListCart.grandTotal * 0.1 +
                  this.props.ListCart.grandTotal
                }
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp'}
                renderText={value => (
                  <Text style={styles.GranPrice}>{value}</Text>
                )}
              />
              <Text style={styles.invoTax}>Include tax 10%</Text>
            </View>
          </Modal>
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
export default connect(mapStateToProps)(Cart);
const styles = StyleSheet.create({
  imageEmpty: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 120,
  },
  Header: {
    flex: 1,
  },
  SubHeader: {
    flex: 1,
  },
  ScrollView: {
    flex: 1,
  },
  HeaderProduct: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    padding: 16,
  },
  PicProduct: {
    width: 120,
    height: 120,
    margin: 3,
    borderRadius: 5,
    marginLeft: 5,
  },
  NameProduct: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  PriceProduct: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  HeaderOrder: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 1,
    flex: 1,
    marginBottom: 4,
  },
  AddOrder: {
    backgroundColor: 'orange',
    padding: 3,
    width: 25,
    borderRadius: 2,
  },
  FontAddOrder: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
  },
  HeaderQuantity: {
    backgroundColor: 'orange',
    width: 30,
    opacity: 0.7,
  },
  Quantity: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
  },
  MinOrder: {
    padding: 3,
    width: 25,
    backgroundColor: 'orange',
    borderRadius: 2,
  },
  MinOrderCondt1: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
  },
  HeaderMinCond2: {
    padding: 3,
    width: 25,
    backgroundColor: 'orange',
    borderRadius: 2,
  },
  MinOrderCond2: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
  },
  DeleteOrder: {
    backgroundColor: 'orange',
    padding: 3,
    marginLeft: 25,
    width: 25,
    borderRadius: 5,
  },
  FontDelete: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  HeaderTotal: {
    flex: 0.3,
    borderTopWidth: 0.8,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
  },
  TextTotalPrice: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  TextPrice: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  TextTax: {
    fontSize: 11,
    marginTop: 4,
  },
  HeaderTakeOrder: {
    padding: 6,
    width: 140,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'orange',
    marginTop: 5,
  },
  TextOrder: {color: 'white'},
  TextModal: {
    fontSize: 11,
  },
  listInvoice: {
    padding: 5,
  },
  nameInvoice: {},
  Quantityinvoice: {
    flexDirection: 'row',
  },
  priceInvoice: {},
  textnameInvoice: {
    fontSize: 18,
  },
  textQuantity: {
    fontSize: 15,
  },
  textPriceInvoice: {
    fontSize: 15,
  },
  invoTotalPrice: {
    alignItems: 'flex-end',
  },
  HeaderGrandTotal: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 0.5,
  },
  GranTotal: {
    fontWeight: 'bold',
  },
  GranPrice: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  invoTax: {
    fontSize: 12,
  },
  buttonInvo: {
    padding: 8,
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 5,
  },
  buttonDone: {
    color: 'white',
    fontWeight: 'bold',
  },
});
