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
  ScrollView,
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
        hasSeenTour: false, 
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
        <View style={styles.headerOverlay}>
          <Text style={styles.headerTitle}>ClubRank</Text>
          <Text style={styles.headerSubtitle}>
          Sign Up For Free
          </Text>
        </View>

      {/* Scrollable Form Container */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign Up</Text>
          {/* Full Name Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name..."
              placeholderTextColor="#999"
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
              placeholder="Enter your username..."
              placeholderTextColor="#999"
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
              placeholder="Enter your email..."
              placeholderTextColor="#999"
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
                placeholder="Enter your password..."
                placeholderTextColor="#999"
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
                placeholder="Confirm your password..."
                placeholderTextColor="#999"
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
          <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Footer: Already have an account? Sign In */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/signIn")}>
              <Text style={styles.footerLink}> Sign In.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDE7E8", // Light pink background
  },

  headerOverlay: {
    top: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  innerContainer: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#FFF",
    alignSelf: "center",
    marginVertical: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    width: "100%",
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
  footer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
  footerText: {
    color: "#333",
  },
  footerLink: {
    color: "#FF5E62",
    fontWeight: "600",
  },
});

export default SignUp;