import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { googleLogin, type User } from "../services/auth.service";


type Props = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function GoogleConnectBtn({ setUser }: Props) {
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async (response: GoogleCredentialResponse) => {
    try {
      const data = await googleLogin(response.credential);

      if (!data.success) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.data.token);
      // localStorage.setItem("refreshToken", data.data.refreshToken);

      setUser(data.data.user);

      toast.success("התחברת עם Google 🎉");
      navigate("/cart");
    } catch (err) {
      console.error(err);
      toast.error("שגיאה בהתחברות עם Google");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(googleBtnRef.current!, {
        theme: "outline",
        size: "large",
      });
    };

    document.body.appendChild(script);
  }, []);

  return <div ref={googleBtnRef}></div>;
}
