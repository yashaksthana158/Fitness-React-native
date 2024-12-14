//import liraries
import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import VideoList from './VideoList';


// create a component
const Activity = () => {
    return (
        <SafeAreaView style={styles.container}>
      <VideoList />
    </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
});

//make this component available to the app
export default Activity;
