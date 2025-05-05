import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { supabase } from "@/supabaseClient";
import { TextInput } from "react-native";

const SearchPage = () => {
  const handleSearch = async (query: string) => {
    const { data, error } = await supabase
      .from("meditations")
      .select("*")
      .ilike("title", `%${query}%`);
    if (error) {
      console.error("Error fetching data:", error);
      return [];
    }
    return data;
  };

  const handleSearchSubmit = async (query: string) => {
    const results = await handleSearch(query);
    console.log("Search Results:", results);
  };

  return (
    <View>
      <Text>Search Meditations that are in supabase currently</Text>
      <TextInput
        placeholder="Search..."
        onSubmitEditing={(event) => handleSearchSubmit(event.nativeEvent.text)}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
      />
      <Text>Search Results will be displayed here</Text>
      {/* Add a FlatList or ScrollView to display the search results */}
      {/* Example: */}
      {/* <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{item.title}</Text>
          )}
        /> */}
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({});
