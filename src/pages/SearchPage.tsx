import {
  DocumentData,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import { db } from "../../firebase";

function SearchPage(): JSX.Element {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DocumentData[]>([]);
  const [people, setPeople] = useState<DocumentData[]>([]);

  const handleSearch = () => {
    // Perform the search logic here
    // You can use an API call or search through a local data source

    // For example, let's assume you have a list of items to search from;

    const filteredItems = people.filter((item: DocumentData) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find a Colleague</Text>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.input}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <Text style={styles.resultsHeading}>Search Results:</Text>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <Text style={styles.resultItem}>{item.name}</Text>
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
  resultItem: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default React.memo(SearchPage);
