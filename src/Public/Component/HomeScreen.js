import React, {Component} from 'react';
import {TextInput, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon, Text, Container, ListItem} from 'native-base';
import {connect} from 'react-redux';
import {requestProduct} from '../../Home/action';
import Modal, {ModalContent, ModalTitle} from 'react-native-modals';

class HomeScreen extends Component {
  state = {
    filterModal: false,
    sortingModal: false,
  };
  componentDidMount() {
    this.props.requestProduct();
  }
  changeSearch = text => {
    const config = {
      params: {
        name_product: text,
      },
    };
    this.props.requestProduct(config);
  };
  handleSort = query => {
    const config = {
      params: {
        sortby: query,
      },
    };
    this.props.requestProduct(config);
  };
  handleCategory = query => {
    const config = {
      params: {
        category: query,
      },
    };
    this.props.requestProduct(config);
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
          <TextInput
            style={styles.textinput}
            placeholder={'Search Menu....'}
            onChangeText={text => this.changeSearch(text)}
          />
          <Icon style={styles.iconsearch} name="md-search" type="Ionicons" />
        </View>

        <View style={styles.content5}>
          <TouchableOpacity
            onPress={() => {
              this.setState({sortingModal: true});
            }}>
            <Icon name="sort-variant" type="MaterialCommunityIcons" />
          </TouchableOpacity>
          <Modal.BottomModal
            visible={this.state.sortingModal}
            onTouchOutside={() => {
              this.setState({sortingModal: false});
            }}
            height={0.5}
            width={1}
            onSwipeOut={() => this.setState({sortingModal: false})}
            modalTitle={<ModalTitle title="Sorting" hasTitleBar />}>
            <ModalContent style={styles.Modal}>
              <Container>
                <ListItem>
                  <TouchableOpacity
                    onPress={() => this.handleSort('dateadd DESC')}>
                    <Text>Newest</Text>
                  </TouchableOpacity>
                </ListItem>
                <ListItem>
                  <TouchableOpacity
                    onPress={() => this.handleSort('name_product ASC')}>
                    <Text>Name ASC</Text>
                  </TouchableOpacity>
                </ListItem>
                <ListItem>
                  <TouchableOpacity
                    onPress={() => this.handleSort('name_product DESC')}>
                    <Text>Name DESC</Text>
                  </TouchableOpacity>
                </ListItem>
                <ListItem>
                  <TouchableOpacity
                    onPress={() => this.handleSort('price DESC')}>
                    <Text>High Price</Text>
                  </TouchableOpacity>
                </ListItem>
                <ListItem>
                  <TouchableOpacity
                    onPress={() => this.handleSort('price ASC')}>
                    <Text>Low Price</Text>
                  </TouchableOpacity>
                </ListItem>
              </Container>
            </ModalContent>
          </Modal.BottomModal>
        </View>

        <View style={styles.content4}>
          <TouchableOpacity
            onPress={() => {
              this.setState({filterModal: true});
            }}>
            <Icon name="ios-funnel" type="Ionicons" />
          </TouchableOpacity>
          <Modal.BottomModal
            visible={this.state.filterModal}
            onTouchOutside={() => {
              this.setState({filterModal: false});
            }}
            height={0.25}
            width={1}
            onSwipeOut={() => this.setState({filterModal: false})}
            modalTitle={<ModalTitle title="Category" hasTitleBar />}>
            <ModalContent style={styles.Modal}>
              <Container>
                <ListItem>
                  <TouchableOpacity onPress={() => this.handleCategory('1')}>
                    <Text>Food</Text>
                  </TouchableOpacity>
                </ListItem>
                <ListItem>
                  <TouchableOpacity onPress={() => this.handleCategory('2')}>
                    <Text>Drink</Text>
                  </TouchableOpacity>
                </ListItem>
              </Container>
            </ModalContent>
          </Modal.BottomModal>
        </View>

        <View style={styles.content3}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Cart')}>
            <Icon style={styles.icon} name="md-cart" type="Ionicons" />
            {this.props.ListCart.cartList.length === 0 ? null : (
              <View style={styles.badge2}>
                <Text style={styles.fontbadge}>
                  {this.props.ListCart.cartList.length}
                </Text>
              </View>
            )}
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

const mapDispatchToProps = dispatch => ({
  requestProduct: payload => dispatch(requestProduct(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0eded',
    padding: 16,
    elevation: 5,
  },
  content1: {
    flex: 0.1,
    alignItems: 'center',
  },
  content2: {
    flex: 0.6,
    marginHorizontal: 16,
  },
  textinput: {
    borderWidth: 0.8,
    borderRadius: 40,
    paddingLeft: 45,
    fontSize: 15,
  },
  iconsearch: {
    position: 'absolute',
    left: 16,
    top: 12,
  },
  content3: {
    flex: 0.1,
    alignItems: 'center',
  },
  icon: {
    color: 'black',
  },
  badge2: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 20,
    left: 10,
    bottom: 22,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontbadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  content4: {
    flex: 0.1,
    alignItems: 'center',
    right: 5,
  },
  content5: {
    flex: 0.1,
    alignItems: 'center',
    right: 10,
  },
  Modal: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});
