import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { meditationData } from "@/services/data";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Vibration } from "react-native";

const MeditationDetails = () => {
  const [selectedDuration, setSelectedDuration] = useState(2);
  const [isMeditating, setIsMeditating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedDuration * 60);

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMeditating && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsMeditating(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isMeditating]);

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const meditation = meditationData.find((item) => item.id === Number(id));

  if (!meditation) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Meditation not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Image */}
      <Image
        source={meditation.image}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Details */}
      <Text style={styles.title}>{meditation.title}</Text>
      <Text style={styles.description}>{meditation.description}</Text>

      <View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Select Duration
        </Text>
        {[2, 5, 10].map((duration) => (
          <TouchableOpacity
            key={duration}
            onPress={() => {
              setSelectedDuration(duration);
              setTimeLeft(duration * 60);
            }}
            style={{
              padding: 10,
              backgroundColor: selectedDuration === duration ? "#ddd" : "#fff",
              borderRadius: 8,
              marginVertical: 5,
            }}
          >
            <Text>{duration} minutes</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          onPress={() => {
            setIsMeditating(!isMeditating);
            if (!isMeditating) {
              const interval = setInterval(() => {
                setTimeLeft((prev) => {
                  if (prev <= 0) {
                    clearInterval(interval);
                    return 0;
                  }
                  return prev - 1;
                });
              }, 1000);
            }
          }}
          style={{
            padding: 15,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <AnimatedCircularProgress
            size={120}
            width={10}
            fill={(1 - timeLeft / (selectedDuration * 60)) * 100}
            tintColor="#3F51B5"
            backgroundColor="#ddd"
            rotation={0}
            lineCap="round"
          >
            {() => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 100,
                  height: 100,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (!isMeditating) {
                      Vibration.vibrate(100);
                      setIsMeditating(true);
                    } else {
                      setIsMeditating(false);
                    }
                  }}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: "#f5f6fa",
                    marginBottom: 4,
                  }}
                >
                  <Ionicons
                    name={isMeditating ? "pause" : "play"}
                    size={32}
                    color="#3F51B5"
                  />
                </TouchableOpacity>
              </View>
            )}
          </AnimatedCircularProgress>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MeditationDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9fafe",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#ddd",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: 10,
  },
  duration: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
});
