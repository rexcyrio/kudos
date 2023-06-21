import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const signup = async (uid: string) => {
    console.log("Signing up");
    await setDoc(doc(db, "users", uid), {
        avatar:"",
        badges: [],
        job: "",
        location: "",
        name: "",
        points: 0,
        profilePicture: ""
      });
};