import "./StarRating.css";

type StarRatingProps = {
  rating?: number;
  showValue?: boolean;
};

function StarRating({ rating = 0, showValue = false }: StarRatingProps) {
  const safeRating = Math.max(0, Math.min(5, rating));
  const fillPercentage = (safeRating / 5) * 100;

  return (
    <div
      className="star-rating"
      aria-label={safeRating ? `דירוג ${safeRating} מתוך 5` : "למוצר אין דירוג עדיין"}
    >
      <span className="star-rating-icons" aria-hidden="true">
        <span className="star-rating-empty">★★★★★</span>
        <span className="star-rating-filled" style={{ width: `${fillPercentage}%` }}>★★★★★</span>
      </span>
      {showValue && <span className="star-rating-value">{safeRating.toFixed(1)}</span>}
    </div>
  );
}

export default StarRating;
