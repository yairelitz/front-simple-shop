
import { useSearchParams, useNavigate } from 'react-router-dom';
import "./PaymentPageResult.css";

export default function PaymentResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isSuccess = searchParams.get('payment') === 'success';
  const orderId = searchParams.get('orderId');

  return (
    <main className="payment-result-page">
      <div className={`payment-result-card ${isSuccess ? 'payment-result-success' : 'payment-result-failed'}`}>
        
        <div className="payment-result-icon">
          {isSuccess ? '✓' : '×'}
        </div>

        <h1>
          {isSuccess ? 'התשלום הצליח!' : 'התשלום נכשל'}
        </h1>

        <p className="payment-result-description">
          {isSuccess
            ? 'תודה על הרכישה! ההזמנה שלך התקבלה בהצלחה.'
            : 'לצערנו לא הצלחנו להשלים את התשלום. ניתן לנסות שוב.'}
        </p>

        {isSuccess && orderId && (
          <div className="payment-result-order">
            <span>מספר הזמנה</span>
            <strong>{orderId}</strong>
          </div>
        )}

        <button
          className="payment-result-button"
          onClick={() => navigate(isSuccess ? '/' : '/checkout')}
        >
          {isSuccess ? 'חזרה לדף הבית' : 'נסה שוב'}
        </button>

        {isSuccess && (
          <p className="payment-result-note">
            פרטי ההזמנה נשמרו במערכת
          </p>
        )}
      </div>
    </main>
  );
}
