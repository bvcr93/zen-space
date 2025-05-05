import { meditationData } from "@/services/data";
import { useRouter } from "expo-router";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Meditations() {
  const router = useRouter();

  const gradientColors = [
    ["#76b852", "#8DC26F"],
    ["#2BC0E4", "#EAECC6"],
    ["#134E5E", "#71B280"],
    ["#3E5151", "#DECBA4"],
    ["#8360c3", "#2ebf91"],
    ["#C9FFBF", "#FFAFBD"],
    ["#1A2980", "#26D0CE"],
  ] as const;
  const images = [
    require("@/assets/images/med1.jpg"),
    require("@/assets/images/med2.jpg"),
    require("@/assets/images/med3.jpg"),
    require("@/assets/images/med4.jpg"),
    require("@/assets/images/med5.jpg"),
    require("@/assets/images/med6.jpg"),
  ];
  return (
    <ImageBackground
      source={require("@/assets/images/med4.jpg")} // or any full-screen image you want
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View
        style={{
          flex: 1,
          paddingTop: 40,
          paddingHorizontal: 10,
          backgroundColor: "rgba(0,0,0,0.3)", // optional dark overlay for contrast
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={{ marginLeft: 8, fontSize: 16, color: "white" }}>
            Back to Home
          </Text>
        </TouchableOpacity>

        {/* Meditation List */}
        <FlatList
          data={meditationData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => router.push(`/meditation/${item.id}`)}
                activeOpacity={0.8}
              >
                <ImageBackground
                  source={images[index % images.length]}
                  style={{
                    height: 150,
                    marginVertical: 10,
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                  imageStyle={{ borderRadius: 12 }}
                >
                  <LinearGradient
                    colors={["rgba(0,0,0,0.6)", "transparent"]}
                    style={{
                      flex: 1,
                      padding: 20,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text style={{ color: "white", marginTop: 5 }}>
                      {item.description}
                    </Text>
                    <Text style={{ color: "white", marginTop: 5 }}>
                      Duration: {item.duration} minutes
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ImageBackground>
  );
}
