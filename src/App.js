import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { getCartData, sendCartData } from './store/cartSlice';
import { useDispatch } from 'react-redux';

let initial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if(initial){
      initial = false;
      return;
    }
    if(cart.changed)
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(getCartData());
  },[])

  return (
    <Layout>
      {cart.showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
