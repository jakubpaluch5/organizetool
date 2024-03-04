import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Zamiast useHistory, używamy useNavigate
import { useCookies } from "react-cookie";
import UserPanel from "./userPanel";
import { app } from "../config/firebase";
import { getFirestore, setDoc, doc, getDoc, updateDoc} from 'firebase/firestore';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [haslo, setHaslo] = useState("");
    const [user, setUser] = useState(null);
    const db = getFirestore(app);
    const [cookies, setCookie] = useCookies(['sessionToken']);
    const navigate = useNavigate(); // Inicjalizacja hooka useNavigate zamiast useHistory

    const signIn = async () => {
        try {
            const existDoc = doc(db, "user", email);
            const existDocEx = await getDoc(existDoc);
            if (!existDocEx.exists()) {
                await setDoc(doc(db, "user", email), {
                    email: email,
                    password: password,
                    company: "OrganizeTool",
                    role: "user",
                    sessionActive:null,
                    token:"",
                });
                alert("User created");
            } else {
                alert("User already exists");
            }
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const loginIn = async () => {
        try {
            const existDoc = doc(db, "user", login);
            const existDocSnapshot = await getDoc(existDoc);
            if (existDocSnapshot.exists()) {
                const userData = existDocSnapshot.data(); // Pobranie danych z dokumentu
                if (haslo === userData.password) {
                    const sessionToken = (Math.random().toString(16).substring(2))+(Math.random().toString(16).substring(2))+(Math.random().toString(16).substring(2));
                    setCookie('sessionToken', sessionToken, { path: '/', expires: new Date(Date.now() + 12 * 60 * 60 * 1000) }); //Wygasa po 12h
    
                    await updateDoc(existDoc, {
                        sessionActive: true,
                        token: sessionToken,
                    });
                    setUser(userData); // Ustaw zalogowanego użytkownika
    
                    // Przekierowanie użytkownika do panelu użytkownika po zalogowaniu
                    navigate("/userPanel");
                } else {
                    alert("Błędne hasło");
                }
            } else {
                alert("Użytkownik nie istnieje");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }    
    };

    const sessionActive = async () => {
        try {
            alert(cookies.sessionToken);
        } catch (error) {
            console.error("Error checking session:", error);
        }
    }

    return (
        <div>
            {/* zawartość komponentu Auth */}
            {user ? (
                <UserPanel user={user} />
            ) : (
                <div>
                    <input 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="Password" 
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button onClick={signIn}>Register</button>
                    <br />
                    <input 
                        placeholder="Login email"
                        onChange={(e)=>setLogin(e.target.value)}
                    />
                    <input 
                        placeholder="Login password"
                        onChange={(e)=>setHaslo(e.target.value)}
                    />
                    <button onClick={loginIn}>Login</button>
                    <br />
                    <button onClick={sessionActive}>Session</button>
                </div>
            )}
        </div>
    );
};

export default Auth;
