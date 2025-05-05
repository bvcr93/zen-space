import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from "react-native";
import React, { useRef, useEffect } from "react";
import { Link } from "expo-router";

const Home = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for CTA
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ImageBackground
      source={require("@/assets/images/med1.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.logo}>🧘‍♀️</Text>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.brand}>Mindful Moments</Text>
        <Text style={styles.subtitle}>Start your meditation journey today</Text>

        <Link href="/meditation" asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <Animated.View
              style={[
                styles.buttonOutlined,
                {
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <Text style={styles.buttonOutlinedText}>Explore Meditations</Text>
            </Animated.View>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  logo: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    opacity: 0.9,
  },
  brand: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#6c63ff",
    paddingVertical: 16,
    paddingHorizontal: 42,
    borderRadius: 50, // fully rounded button
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // for Android shadow
    borderWidth: 1,
    borderColor: "#fff2", // subtle border glow
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  buttonOutlined: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonOutlinedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
