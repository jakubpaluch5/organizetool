import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase";

const UserPanel = ({ user }) => {
    
    const db = getFirestore(app);
    const navigate = useNavigate();
    const [cookies] = useCookies(['sessionToken']);
    console.log(useCookies());
    useEffect(() => {
        if (!cookies.sessionToken) {
            navigate("/");
        }
    }, [cookies.sessionToken, navigate]);

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2>User Panel</h2>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Wyloguj</button>
                </div>
            ) : (
                <p>Brak danych użytkownika.</p>
            )}
        </div>
    );
};

export default UserPanel;
