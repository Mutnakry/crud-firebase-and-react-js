import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase"; // Ensure these are correctly exported
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "", // Consider capturing this info from user input later
          });
          toast.success("User logged in successfully", { position: "top-center" });
          window.location.href = "/profile"; // Or use useNavigate for programmatic navigation
        }
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center" });
      });
  };

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4JMEn5xL4b6Riz1fwTztbmZ40W-RxNf22gRUDkduLl_jM82oZNXBYouFoM-CxBvuezOc&usqp=CAU' alt="Google sign-in" height={60}  />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
