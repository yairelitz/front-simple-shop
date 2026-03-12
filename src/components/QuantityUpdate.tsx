import Button from "@mui/material/Button";
type Props = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

function QuantityUpdate({ quantity, onIncrease, onDecrease }: Props) {
  return (
    <>
      <Button onClick={onIncrease}>+</Button>
      <span>{quantity}</span>
      <Button onClick={onDecrease}>-</Button>
    </>
  );
}

export default QuantityUpdate;
