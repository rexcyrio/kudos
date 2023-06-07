import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import LineBreak from "../components/LineBreak";
import MyAccordion from "../components/MyAccordion";

function PageWithPaper() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.title}>International Potato Day</Text>

        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            gap: 20,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("gray", false)}
          >
            <Card>
              <Card.Content>
                <Title>Welcome</Title>
                <Paragraph>Thank you for downloading this app.</Paragraph>
              </Card.Content>

              <Card.Cover
                style={{ marginTop: 15, height: 200 }}
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Patates.jpg",
                }}
              />
            </Card>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("gray", false)}
          >
            <Card>
              <Card.Content>
                <Text>
                  Ipsum consequat aliqua nostrud consequat deserunt. Irure ea id
                  mollit laboris eu nostrud laboris proident nostrud laborum
                  tempor nostrud non.
                </Text>
              </Card.Content>
            </Card>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("gray", false)}
          >
            <Card>
              <Card.Content>
                <Text>
                  In consequat amet voluptate et incididunt fugiat incididunt
                  amet pariatur laborum consequat.
                  <LineBreak />
                  Velit officia ipsum exercitation officia commodo consequat
                  anim ipsum aute reprehenderit ullamco magna.
                  <LineBreak />
                  Est minim elit officia elit reprehenderit consectetur sit amet
                  tempor aliqua do ut id. Quis ipsum pariatur incididunt in
                  labore ea culpa.
                  <LineBreak />
                  Sit tempor amet quis et exercitation elit aliqua fugiat ut
                  exercitation. Ullamco sint mollit in velit aute fugiat.
                  Deserunt anim nisi nisi amet sunt velit nisi veniam nostrud.
                </Text>
              </Card.Content>
            </Card>
          </TouchableNativeFeedback>

          <MyAccordion />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
});

export default React.memo(PageWithPaper);
