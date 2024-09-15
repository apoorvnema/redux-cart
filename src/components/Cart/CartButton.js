import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../../store/cartSlice';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const handleCartToggle = () => {
    dispatch(cartActions.toggleCart());
  }

  return (
    <button onClick={handleCartToggle} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
