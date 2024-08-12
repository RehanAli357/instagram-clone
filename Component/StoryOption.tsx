import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StoryOption: React.FC = () => {
  return (
    <View style={styles.moreModal}>
      <View style={styles.modalHandle} />
      <View style={{ gap: 30, paddingTop: 30 }}>
        <Text style={{ color: 'red' }}>Report...</Text>
        <Text>Mute</Text>
      </View>
    </View>
  );
};

export default StoryOption;

const styles = StyleSheet.create({
  moreModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 135,
    width: '100%',
    marginTop: '100%',
    paddingHorizontal: 20,
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
});
