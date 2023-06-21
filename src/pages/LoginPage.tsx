import React, { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Button, StyleSheet, TextInput, View, TouchableOpacity, ImageBackground } from "react-native";
import { signup } from "../utilities/signup";

function LoginPage(props: any) {
  const { setUid } = props;
  const [user, setUser] = useState<User | null>(null);

  console.log("Login page");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("password");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user.uid);
        signup(user.uid);
        setUid(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Sign up error:", errorCode, errorMessage);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user.uid);
        setUid(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Sign in error:", errorCode, errorMessage);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        setUid("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Sign out error:", errorCode, errorMessage);
      });
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.heading}>Kudos</Text>
    </View>
    <View style={styles.card}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createAccountButton} onPress={handleSignUp}>
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    width: '100%',
    height: 200,
    backgroundColor: '#FFAFED',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  forgotPasswordButton: {
    width:'100%',
    textAlign:'flex-end',
  },
  forgotPasswordButtonText: {
    color: '#20B2AA',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign:'right'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    padding: 20,
    marginTop: 40,
    width: '90%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFAFED',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  createAccountButton: {
    marginTop: 20,
  },
  createAccountButtonText: {
    color: '#FFAFED',
    fontSize: 12,
    fontWeight: 'bold',
  },
}
);

export default React.memo(LoginPage);
