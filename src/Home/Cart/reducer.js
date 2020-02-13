const initialState = {
  cartList: [],
  grandTotal: 0,
};

const ListCart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART':
      let prevCart = [];
      state.cartList.map((dataCart, index) => {
        if (dataCart.id === action.dataCart.id) {
          prevCart.push('1');
        }
      });
      if (prevCart.length === 0) {
        return {
          ...state,
          cartList: [
            ...state.cartList,
            {
              ...action.dataCart,
              quantity: 1,
              totalPrice: 1 * action.dataCart.price,
            },
          ],
          grandTotal: state.grandTotal + 1 * action.dataCart.price,
        };
      } else {
        return {
          ...state,
        };
      }
    case 'REMOVE_CART':
      let cartForDelete = state.cartList.filter(dataCart => {
        return dataCart.id !== action.dataCart.id;
      });
      let priceDelete = state.cartList.filter(dataCart => {
        return dataCart.id === action.dataCart.id;
      });
      return {
        cartList: cartForDelete,
        grandTotal: state.grandTotal - parseInt(priceDelete[0].totalPrice),
      };
    case 'EMPTY_CART':
      return {
        cartList: [],
        grandTotal: 0,
      };
    case 'INCREMENT_CART':
      let totalPlus = 0;
      let cartMapPlus = state.cartList.map((dataCart, i) => {
        if (dataCart.id === action.dataCart.id) {
          totalPlus = state.grandTotal + parseInt(dataCart.price);
          return {
            ...dataCart,
            quantity: dataCart.quantity + 1,
            totalPrice: dataCart.price * (dataCart.quantity + 1),
          };
        } else {
          return {
            ...dataCart,
          };
        }
      });
      return {
        ...state,
        cartList: cartMapPlus,
        grandTotal: totalPlus,
      };
    case 'DECREMENT_CART':
      let totalMinus = 0;
      let cartMapMinus = state.cartList.map((dataCart, i) => {
        if (dataCart.id === action.dataCart.id) {
          totalMinus = state.grandTotal - parseInt(dataCart.price);
          return {
            ...dataCart,
            quantity: dataCart.quantity - 1,
            totalPrice: dataCart.price * (dataCart.quantity - 1),
          };
        } else {
          return {
            ...dataCart,
          };
        }
      });
      return {
        ...state,
        cartList: cartMapMinus,
        grandTotal: totalMinus,
      };
    case 'POST_CART_PENDING':
      return {
        ...state,
      };
    case 'POST_CARD_REJECTED':
      return {
        ...state,
      };
    case 'POST_CARD_FULFILLED':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default ListCart;
