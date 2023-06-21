import { Picker } from "@react-native-picker/picker";
import {
  QueryConstraint,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { db } from "../../firebase";
import LeaderboardPersonComponent from "../components/LeaderboardPersonComponent";
import { LeaderboardPageProps, Person } from "../utilities/types";

function LeaderboardPage({
  navigation,
  route,
}: LeaderboardPageProps): JSX.Element {
  const [filterByJob, setFilterByJob] = useState("");
  const [filterByLocation, setFilterByLocation] = useState("");
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    const queryConstraints: QueryConstraint[] = [
      orderBy("points", "desc"),
      limit(100),
    ];

    if (filterByJob !== "") {
      queryConstraints.push(where("job", "==", filterByJob));
    }

    if (filterByLocation !== "") {
      queryConstraints.push(where("location", "==", filterByLocation));
    }

    const q = query(collection(db, "users"), ...queryConstraints);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const persons = querySnapshot.docs.map((doc, index) => {
        const person = {
          id: doc.id,
          ...doc.data(),
        } as Person;

        return person;
      });
      setPersons(persons);
    });

    return unsubscribe;
  }, [filterByJob, filterByLocation]);

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.filterContainer}>
        <View style={styles.jobFilter}>
          <Text style={styles.jobFilterContent}>Job</Text>

          <Picker
            selectedValue={filterByJob}
            onValueChange={(itemValue, itemIndex) => setFilterByJob(itemValue)}
            style={styles.filterPicker}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Software Engineer" value="Software Engineer" />
            <Picker.Item label="Product Manager" value="Product Manager" />
          </Picker>
        </View>

        <View style={styles.locationFilter}>
          <Text style={styles.locationFilterContent}>Location</Text>
          <Picker
            selectedValue={filterByLocation}
            onValueChange={(itemValue, itemIndex) =>
              setFilterByLocation(itemValue)
            }
            style={styles.filterPicker}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Singapore" value="Singapore" />
            <Picker.Item label="Malaysia" value="Malaysia" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={persons}
        renderItem={({ item, index }) => (
          <LeaderboardPersonComponent
            position={index + 1}
            person={item}
            navigation={navigation}
          />
        )}
        keyExtractor={(person, index) => person.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  filterContainer: {
    width: "100%",
    height: 100,
    color: "black",
    marginBottom: 25,
  },
  jobFilter: {
    width: "100%",
    height: 50,
    color: "black",
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  jobFilterContent: {
    width: "100%",
    height: 50,
    color: "black",
    fontWeight: "bold",
  },
  locationFilter: {
    width: "100%",
    height: 50,
    color: "black",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  locationFilterContent: {
    width: "100%",
    height: 50,
    color: "black",
    fontWeight: "bold",
  },
  filterPicker: {
    width: "100%",
    height: 50,
    color: "black",
    borderRadius: 10,
  },
})

export default React.memo(LeaderboardPage);
