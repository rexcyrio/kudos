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
import { FlatList, Text, View } from "react-native";
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
      <View style={{ flexDirection: "row", width: "100%" }}>
        <View style={{ backgroundColor: "lightgreen", width: "50%" }}>
          <Text>Job:</Text>

          <Picker
            selectedValue={filterByJob}
            onValueChange={(itemValue, itemIndex) => setFilterByJob(itemValue)}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Software Engineer" value="Software Engineer" />
            <Picker.Item label="Product Manager" value="Product Manager" />
          </Picker>
        </View>

        <View style={{ backgroundColor: "orange", width: "50%" }}>
          <Text>Location:</Text>
          <Picker
            selectedValue={filterByLocation}
            onValueChange={(itemValue, itemIndex) =>
              setFilterByLocation(itemValue)
            }
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

export default React.memo(LeaderboardPage);
