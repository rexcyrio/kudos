import { MaterialCommunityIcons } from "@expo/vector-icons";
import disc from "@jsamr/counter-style/presets/disc";
import MarkedList from "@jsamr/react-native-li";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { db } from "../../firebase";
import ViewLeaderboardButton from "../components/ViewLeaderboardButton";

function HomePage({ navigation }): JSX.Element {
  const [name, setName] = useState(null);
  const [pic, setPic] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "users"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc, index) => {
        return doc.data();
      });

      setName(data[0].name);
      setPic(data[0].pic);
      setPoints(data[0].points);
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView style={{ paddingHorizontal: 15 }}>
      <View style={{ marginBottom: 15 }}>
        <Text style={styles.title}>Welcome to Kudos</Text>
        <Card>
          <Card.Content
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="cards-heart"
                size={24}
                color="#ce00ff"
                style={{ marginRight: 10 }}
              />
              <Text>Your current Kindness Points: </Text>
            </View>

            <View>
              <Text>{points}</Text>
            </View>
          </Card.Content>
        </Card>

        <Text style={{ marginTop: 15 }}>
          Spread kindness in your workplace and earn points for your good deeds!
        </Text>

        <Card style={{ marginTop: 15 }}>
          <Card.Content>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
            >
              Suggested ways to earn Kindness points:
            </Text>

            <MarkedList counterRenderer={disc}>
              <Text style={styles.unorderedListItem}>
                Bring in treats for the team
              </Text>
              <Text style={styles.unorderedListItem}>
                Help a coworker with a task
              </Text>
              <Text style={styles.unorderedListItem}>
                Give a compliment to a coworker
              </Text>
              <Text style={styles.unorderedListItem}>
                Participate in a team-building activity
              </Text>
            </MarkedList>
          </Card.Content>
        </Card>
      </View>

      <ViewLeaderboardButton navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 15,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  unorderedListItem: {
    flexShrink: 1,
  },
});

export default React.memo(HomePage);
