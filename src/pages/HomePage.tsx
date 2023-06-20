import { MaterialCommunityIcons } from "@expo/vector-icons";
import disc from "@jsamr/counter-style/presets/disc";
import MarkedList from "@jsamr/react-native-li";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import ViewLeaderboardButton from "../components/ViewLeaderboardButton";

function HomePage({ navigation, route }): JSX.Element {
  const num = 1234567;

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
              <Text>{num}</Text>
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
              <Text style={styles.unorderedListItem}>
                Google LLC is an American multinational iiiiiiii technology
              </Text>
              <Text style={styles.unorderedListItem}>
                A component can specify the layout of its children using the
                Flexbox algorithm. Flexbox is designed to provide a consistent
                layout on different screen sizes. You will normally use a
                combination of flexDirection, alignItems, and justifyContent to
                achieve the right layout.In the following example, the red,
                orange, and green views are all children in the container view
                that has flex: 1 set. The red view uses flex: 1 , the orange
                view uses flex: 2, and the green view uses flex: 3 . 1+2+3 = 6,
                which means that the red view will get 1/6 of the space, the
                orange 2/6 of the space, and the green 3/6 of the space.
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
