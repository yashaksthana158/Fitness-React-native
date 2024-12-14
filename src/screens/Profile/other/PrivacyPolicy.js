//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Alert } from 'react-native';

// create a component
const PrivacyPolicy = ({navigation}) => {
    useEffect(() => {
        // Show the "Coming Soon" alert when the component is mounted
        const unsubscribe = navigation.addListener('focus', () => {
            Alert.alert("Coming Soon", "This feature will be available soon!");
            navigation.goBack(); // Navigate back to the previous screen or tab
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Text>PrivacyPolicy</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default PrivacyPolicy;
