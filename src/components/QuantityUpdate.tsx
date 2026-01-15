type Props = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

function QuantityUpdate({ quantity, onIncrease, onDecrease }: Props) {
  return (
    <>
      <button onClick={onIncrease}>+</button>
      <span>{quantity}</span>
      <button onClick={onDecrease}>-</button>
    </>
  );
}

export default QuantityUpdate;
