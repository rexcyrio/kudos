import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Text, TouchableOpacity, Switch } from "react-native";
import { Feather } from '@expo/vector-icons';

const SECTIONS = [
  {
    header: 'Preferences',
    icon: 'settings',
    items: [
      { icon: 'globe', color: '#fe9400', label: 'Language', type: 'link' },
      {
        id: 'darkMode',
        icon: 'moon',
        color: '#007afe',
        label: 'Use Wi-Fi',
        type: 'toggle',
      },
      { icon: 'navigation', 
        color: '#32c759', 
        label: 'Location', 
        type: 'link' 
      },
      {
        id: 'enableSound',
        icon: 'speaker',
        color: '#32c759',
        label: 'Enable sound',
        type: 'toggle',
      },
      {
        id: 'enableNotifications',
        icon: 'bell',
        color: '#fd2d54',
        label: 'Enable notifications',
        type: 'toggle',
      },
    ],
  },
  {
    header: 'Help',
    icon: 'help-circle',
    items: [
      { icon: 'flag', color: '#8e8d91', label: 'Report Bug', type: 'link' },
      {
        icon: 'mail',
        color: '#007afe',
        label: 'Contact Us',
        type: 'link',
      },
    ],
  },
];

function SettingsPage() {
  const [form, setForm] = React.useState({
    darkMode: true,
    wifi: false,
    showCollaborators: true,
    accessibilityMode: false,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.profileAvatarWrapper}>
              <Image style={styles.profileAvatar} source={require("../../assets/profile_img1.png")} />
              <View style={styles.profileAction}>
                <Feather name="edit-3" size={15} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>

          <Text style={styles.profileName}>Jethro Sim</Text>
          <Text style={styles.profilePoints}>Points: 1000</Text>
        </View>
        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <Text style={styles.sectionHeader}>{header}</Text>

            {items.map(({ id, label, type, icon, color }) => (
              <TouchableOpacity key={icon} onPress={() => {}}>
                <View style={styles.row}>
                  <View style={[styles.rowIcon, { backgroundColor: color }]}>
                    <Feather name={icon} color="#fff" size={18} />
                  </View>
                  <Text style={styles.rowLabel}>{label}</Text>

                  <View style={{ flex: 1 }} />

                  {type === 'toggle' && (
                    <Switch value={form[id]} onValueChange={(value) => setForm({ ...form, [id]: value })} />
                  )}

                  {type === 'link' && <Feather name="chevron-right" color="#0c0c0c" size={22} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  profile: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profilePoints: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAction: {
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowLabel: {
    fontSize: 17,
    color: '#0c0c0c',
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
});

export default SettingsPage;