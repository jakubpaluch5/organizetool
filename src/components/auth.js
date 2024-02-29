import { useState } from "react";
import { auth,app } from "../config/firebase";
import { getFirestore, setDoc, doc, getDoc} from 'firebase/firestore';

export const Auth = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    const [login,loginl]=useState("");
    const [haslo,haslol]=useState("");
    const db = getFirestore(app);

    const signIn = async () => {
        const existDoc = doc(db, "user", email);
        const existDocEx = await getDoc(existDoc);
        if(!existDocEx.exists()){
        await setDoc(doc(db, "user", email), {
            email: email,
            password: password,
            company: "OrganizeTool",
          });
          alert("User creted");
        } else {
            alert("exist")
        }

    };

    const loginIn = async () => {
        const existDoc = doc(db, "user", login);
        const existDocEx = await getDoc(existDoc);
        if(haslo==existDocEx.data()['password']){
            alert("Zalogowny pomyslnie");
        } else {
            alert("Błędne hasło");
        }
        
    };
    return (
    <div>
        <input 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        placeholder="Password" 
        onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={signIn}>Zarejestruj</button>

        <br />
        <input 
        placeholder="Login email"
        onChange={(e)=>loginl(e.target.value)}
        />
        <input 
        placeholder="Login haslo"
        onChange={(e)=>haslol(e.target.value)}
        />
        <button onClick={loginIn}>Zaloguj</button>
    </div>
    );
};