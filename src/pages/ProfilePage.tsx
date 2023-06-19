import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import {Svg, Path} from 'react-native-svg';

function ProfilePage(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.profile_frame}>
        <Image 
          style={styles.profile_img}
          source={require('/assets/profile_img1.png')}
        />
        <View style={styles.name_container}>
          <Text style={styles.name}> {`Jethro Sim`}</Text>
          <Text style={styles.title}>{`Product Manager`}</Text>
          <Text style={styles.Points}>{`1000 points`}</Text>
        </View>
        <Image
          style={styles.edit_profile_img}
          source={require('/assets/pencil.png')}
        />
      </View>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Points: {
    margin: 16,
    marginTop: 0,
    height: 17,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    textAlignVertical: 'top',
    color: '#bfbfbf',
  },
  name: {
    margin: 10,
    height: 27,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  title: {
    margin: 16,
    marginTop: 0,
    marginBottom: 0,
    height: 16,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  name_container:{
    flex:1,
    justifyContent: 'flex-start',
  },
  profile_img: {
    display: 'flex',
    flexDirection: 'column',
    margin: 15,
    marginTop: 0,
    width: 100,
    height: 100,
    borderRadius: 700,
  },
  profile_frame: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
    backgroundColor: '#e0e0e0',
  },
  edit_profile_img: {
    marginLeft: 'auto',
    marginRight: 35,
    marginTop: 35,
    width: 30,
    height: 30,
    borderRadius: 0,
  },
});


export default React.memo(ProfilePage);