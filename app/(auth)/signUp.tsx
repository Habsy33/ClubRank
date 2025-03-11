import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, ref, set, get } from "@/firebaseConfig";

const { width } = Dimensions.get("window");

// Replace with your desired header image URL or local require(...) statement
const HEADER_IMAGE_URI =
  "https://images.unsplash.com/photo-1589987606637-4e92f42f7bef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80";

const SignUp: React.FC = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  // Toggles for showing/hiding passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    try {
      if (!email || !username || !password || !confirmPassword || !fullName) {
        setErrorMessage("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      // Check if username is already taken
      const usernameRef = ref(db, `usernames/${username}`);
      const snapshot = await get(usernameRef);

      if (snapshot.exists()) {
        setErrorMessage("Username already taken. Choose another.");
        return;
      }

      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Store user details in Realtime Database
      const userRef = ref(db, `users/${userId}`);
      await set(userRef, {
        fullName,
        username,
        email,
        userId,
        createdAt: new Date().toISOString(),
      });

      // Store username to prevent duplicates
      await set(usernameRef, { userId });

      // Redirect user to another authentication page (e.g., email verification)
      router.push("/(tabs)");
    } catch (error: any) {
      console.error("Error signing up:", error);

      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already registered. Try logging in instead.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Password should be at least 6 characters.");
      } else {
        setErrorMessage(error.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Background Image */}
      <ImageBackground
        source={{ uri: HEADER_IMAGE_URI }}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>Sign Up For Free</Text>
          <Text style={styles.headerSubtitle}>
            Quickly make your account in 1 minute
          </Text>
        </View>
      </ImageBackground>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Full Name Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            autoCapitalize="words"
            onChangeText={setFullName}
            value={fullName}
          />
        </View>

        {/* Username Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Your username"
            autoCapitalize="none"
            onChangeText={setUsername}
            value={username}
          />
        </View>

        {/* Email Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="elementary221b@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="**********"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeButtonText}>{showPassword ? "🙈" : "👁"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="**********"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text style={styles.eyeButtonText}>
                {showConfirmPassword ? "🙈" : "👁"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Footer: Already have an account? Sign In */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signIn")}>
            <Text style={styles.signInLink}> Sign In.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerImage: {
    width: "100%",
    height: 250,
    justifyContent: "flex-end",
  },
  headerOverlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: "#333",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    marginRight: 10,
  },
  eyeButton: {
    padding: 8,
  },
  eyeButtonText: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: "#FF5E62",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
  footerText: {
    color: "#333",
  },
  signInLink: {
    color: "#FF5E62",
    fontWeight: "600",
  },
});

export default SignUp;