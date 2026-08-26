import { useNavigate } from "react-router-dom"
import "../pages/Cart/CartPage.css"
function HomePageBtn() {
    const navigate = useNavigate()

    const handleButton = () => {
        navigate("/")
    }
  return (
    <button className="btn-to-home" onClick={handleButton}>בחר מוצרים</button>
  )
}

export default HomePageBtn