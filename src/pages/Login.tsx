import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/auth.service";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../components/Header";

export default function Login() {
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
  console.log("The token isss : ",res.data.token);
  console.log("TOKEN:", localStorage.getItem("token"));

  // console.log("TOKEN:", localStorage.getItem("token"));
  // console.log("fucking token : ",data.token)
  // console.log("LOGIN RAW DATA:", data.data.token);
  
  toast.success("התחברת בהצלחה");
  navigate("/cart");
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
    <>
    <Header/>
    <div>
      <h2>התחברות</h2>

      <form onSubmit={handleSubmit}>
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button disabled={loading}>{loading ? "מתחבר..." : "התחבר"}</button>
      </form>

      <p>
        אין לך חשבון? <Link to="/register">הרשמה</Link>
      </p>
    </div>
    </>
  );
}
