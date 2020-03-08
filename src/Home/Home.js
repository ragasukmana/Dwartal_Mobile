import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {Card, CardItem, Content, Body, Text} from 'native-base';
import {requestProduct} from './action';
import HomeScreen from '../Public/Component/HomeScreen';
import NumberFormat from 'react-number-format';
import {addCart} from './Cart/action';
import {API_HOST} from 'react-native-dotenv';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(requestProduct());
  }
  static navigationOptions = props => ({
    header: <HomeScreen {...props} />,
  });
  handleProfile = () => {
    this.props.navigation.navigate('Profile');
  };

  render() {
    let data = [];
    if (this.props.getProduct.dataProduct.data === undefined) {
      data = [];
    } else {
      data = this.props.getProduct.dataProduct.data.data.result;
    }

    return (
      <View>
        <View>
          <FlatList
            style={styles.flatliststyle}
            numColumns={2}
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <View style={styles.viewcard}>
                  <Content style={styles.contentcard}>
                    <Card style={styles.cardstyle}>
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => {
                          this.props.dispatch(addCart(item));
                        }}>
                        <CardItem cardBody>
                          <Image
                            style={styles.imagecard}
                            source={{
                              uri: `${API_HOST}` + '/' + item.image,
                            }}
                          />
                        </CardItem>
                        <CardItem>
                          <Body>
                            <Text style={styles.textproduct}>
                              {item.name_product}
                            </Text>
                            <NumberFormat
                              value={item.price}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'Rp'}
                              renderText={value => (
                                <Text style={styles.textprice}>{value}</Text>
                              )}
                            />
                          </Body>
                        </CardItem>
                      </TouchableOpacity>
                    </Card>
                  </Content>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    getProduct: state.product,
  };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  contentcard: {
    margin: 5,
    elevation: 5,
  },
  cardstyle: {
    margin: 5,
    elevation: 5,
    overflow: 'hidden',
    borderRadius: 8,
  },
  imagecard: {
    height: 150,
    flex: 1,
  },
  textproduct: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  flatliststyle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  viewcard: {
    flex: 0.5,
  },
  textprice: {
    alignSelf: 'center',
    fontSize: 12,
  },
});
