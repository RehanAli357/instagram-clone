import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfilePopup: React.FC = () => {
  const [type, setType] = useState<'profile' | 'avtar'>('profile');

  return (
    <View style={styles.moreModal}>
      <View style={styles.modalHandle}></View>
      <View style={styles.tabContainer}>
        <View style={[styles.tab, { borderBottomWidth: type === 'profile' ? 1 : 0 }]}>
          <TouchableOpacity onPress={() => setType('profile')}>
            <Image source={require('../assets/InnerOval.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={[styles.tab, { borderBottomWidth: type === 'avtar' ? 1 : 0 }]}>
          <TouchableOpacity onPress={() => setType('avtar')}>
            <Image
              source={require('../assets/dummyUser.png')}
              style={[styles.icon, styles.iconLarge]}
            />
          </TouchableOpacity>
        </View>
      </View>
      {type === 'profile' ? (
        <View style={styles.actionContainer}>
          <View style={styles.actionItem}>
            <Image source={require('../assets/gallery.png')} style={styles.icon} />
            <Text>New profile picture</Text>
          </View>
          <View style={styles.actionItem}>
            <Image source={require('../assets/bin2.png')} style={styles.icon} />
            <Text style={styles.removeText}>Remove current picture</Text>
          </View>
        </View>
      ) : (
        <View style={styles.actionContainer}>
          <View style={styles.actionItem}>
            <Image source={require('../assets/pencil.png')} style={[styles.icon, styles.iconTint]} />
            <Text>Edit Profile Picture</Text>
          </View>
          <View style={styles.actionItem}>
            <Image source={require('../assets/dummyUser.png')} style={styles.icon} />
            <Text>Add avtar</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  moreModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 385,
    width: '100%',
    marginTop: '100%',
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: 'gray',
    borderRadius: 50,
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconLarge: {
    width: 55,
    height: 55,
  },
  iconTint: {
    tintColor: 'black',
  },
  actionContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  removeText: {
    color: 'red',
  },
});

export default ProfilePopup;
