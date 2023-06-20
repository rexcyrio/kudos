import {
  DocumentData,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { db } from "../../firebase";

function SearchPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DocumentData[]>([]);
  const [people, setPeople] = useState<DocumentData[]>([]);

  const handleSearch = useCallback(() => {
    // Perform the search logic here

    const filteredResults = people.filter((item: DocumentData) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [searchTerm]);

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useEffect(() => {
    const q = query(collection(db, "users"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc, index) => {
        return doc.data();
      });

      setPeople(posts);
      console.log(posts);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find a Colleague</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChangeText={handleSearchTermChange}
          style={styles.input}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <Text style={styles.resultsHeading}>Search Results:</Text>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <View style={styles.profileCircle}>
              <Image
                source={{ uri: item.profilePicture }}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.resultItem}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
  },
  resultsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  resultItem: {
    fontSize: 16,
  },
});

export default React.memo(SearchPage);
