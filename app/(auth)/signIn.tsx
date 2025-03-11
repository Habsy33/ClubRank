import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";

const SignInScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        setErrorMessage("Please fill in all fields.");
        return;
      }

      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User signed in:", user);

      // Redirect to the main app screen
      router.push("/(tabs)");
    } catch (error: any) {
      console.error("Error signing in:", error);

      if (error.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else if (error.code === "auth/user-not-found") {
        setErrorMessage("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password.");
      } else {
        setErrorMessage(error.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Outer "Card" or Box */}
      <View style={styles.innerContainer}>
        {/* Title & Subtitle */}
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Rate venues, share with friends :)</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email..."
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
          />
        </View>

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Forgot Links */}
        <View style={styles.forgotContainer}>
          <TouchableOpacity onPress={() => console.log("Forgot Username")}>
            <Text style={styles.forgotText}>Forgot Username?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Forgot Password")}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Social Sign-In Buttons */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => console.log("Sign in with Google")}
        >
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => console.log("Sign in with Facebook")}
        >
          <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
        </TouchableOpacity>

        {/* Footer: Already have an account? Sign In. */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Do not have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signUp")}>
            <Text style={styles.footerLink}> Sign Up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// --------------------- STYLES ---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDE7E8", // Light pink background
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  submitButton: {
    width: "100%",
    backgroundColor: "#FF5E62",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 10,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  forgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  forgotText: {
    color: "#007AFF",
    fontSize: 12,
  },
  socialButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
  },
  socialButtonText: {
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
  },
  footerText: {
    color: "#333",
  },
  footerLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default SignInScreen;