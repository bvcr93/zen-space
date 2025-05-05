export interface Meditation {
    id: number;
    title: string;
    duration: number; // in minutes
    description: string;
    image: any; // change type from string to any (require returns a number)
  }
  
  export const meditationData: Meditation[] = [
    {
      id: 1,
      title: "Morning Meditation",
      duration: 10,
      description: "Start your day with a refreshing meditation.",
      image: require("@/assets/images/med1.jpg"),
    },
    {
      id: 2,
      title: "Evening Relaxation",
      duration: 15,
      description: "Unwind and relax with this evening meditation.",
      image: require("@/assets/images/med2.jpg"),
    },
    {
      id: 3,
      title: "Focus and Clarity",
      duration: 20,
      description: "Enhance your focus and clarity with this session.",
      image: require("@/assets/images/med3.jpg"),
    },
    {
      id: 4,
      title: "Stress Relief",
      duration: 25,
      description: "Release stress and tension with this guided meditation.",
      image: require("@/assets/images/med4.jpg"),
    },
    {
      id: 5,
      title: "Sleep Meditation",
      duration: 30,
      description: "Prepare for a restful night's sleep with this meditation.",
      image: require("@/assets/images/med5.jpg"),
    },
    {
      id: 6,
      title: "Gratitude Practice",
      duration: 15,
      description: "Cultivate gratitude and positivity in your life.",
      image: require("@/assets/images/med6.jpg"),
    },
    {
      id: 7,
      title: "Mindfulness Meditation",
      duration: 20,
      description: "Practice mindfulness and stay present in the moment.",
      image: require("@/assets/images/med1.jpg"), 
    },
  ];
  