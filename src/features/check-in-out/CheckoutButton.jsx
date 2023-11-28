import {Button} from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
