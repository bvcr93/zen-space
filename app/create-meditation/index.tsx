import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { supabase } from "@/supabaseClient";
import { useRouter } from "expo-router";

const CreateMeditation = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch("https://your-project-id.supabase.co/rest/v1/meditations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: "your-anon-key",
        Authorization: "Bearer your-anon-key", 
      },
      body: JSON.stringify([{ title, duration: Number(duration), description }]),
    });
  
    if (!res.ok) {
      console.error(await res.text());
      Alert.alert("Error", "Something went wrong while saving.");
      return;
    }
  
    Alert.alert("Success", "Meditation saved!");
    router.back();
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Meditation</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Duration (minutes)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={[styles.input, { height: 100 }]}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateMeditation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6c63ff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
