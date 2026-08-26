import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, verifyUser } from "../../services/auth.service";
import axios from "axios";
import "./Auth.css";
import { toast } from "react-toastify";
// import Header from "../components/Header/Header";
import type { User } from "../../services/auth.service";
import GoogleConnectBtn from "../../components/GoogleConnectBtn";

type LoginProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function Login({ setUser }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

  try {
  const res = await login({ email, password });

  localStorage.setItem("token", res.data.token);
  const currentUser = await verifyUser();
  setUser(currentUser);

  console.log("The token is : ",res.data.token);
  console.log("TOKEN:", localStorage.getItem("token"));
  
  toast.success("התחברת בהצלחה");
  navigate("/");
} catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401) {
      setError("אימייל או סיסמה שגויים");
    } else {
      setError("שגיאת שרת");
    }
  } else {
    setError("שגיאה לא צפויה");
  }
} finally {
  setLoading(false);

  };
}

  return (
  <div className="auth-container">
    <div className="auth-card">
      <h2>התחברות</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          placeholder="אימייל"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="סיסמה"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button disabled={loading}>
          {loading ? "מתחבר..." : "התחבר"}
        </button>
      </form>

      <div className="auth-footer">
        אין לך חשבון? <Link to="/register">הרשמה</Link>
      </div>

      <div className="auth-divider">או</div>

      <GoogleConnectBtn setUser={setUser} />
    </div>
  </div>
);
}
