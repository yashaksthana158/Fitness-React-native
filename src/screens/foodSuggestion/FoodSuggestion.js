import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import BASE_URL from '../../Navigation/config';

const FoodSuggestionScreen = () => {
    const [mealData, setMealData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/MealSuggestion/`, {  // Update this to the correct endpoint
            method: 'GET',
            credentials: 'include',  // Ensures cookies are sent, including session ID
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMealData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching meal suggestion:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Fetching your meal plan...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Icon name="error-outline" size={50} color="red" />
                <Text style={styles.errorText}>Error: {error.message}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!mealData) {
        return (
            <View style={styles.noDataContainer}>
                <Icon name="fastfood" size={50} color="#999" />
                <Text style={styles.noDataText}>No meal suggestion found for this user.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Breakfast</Card.Title>
                <Card.Divider />
                <Text style={styles.mealText}>{mealData.breakfast}</Text>
            </Card>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Morning Snack</Card.Title>
                <Card.Divider />
                <Text style={styles.mealText}>{mealData.morning_snack}</Text>
            </Card>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Lunch</Card.Title>
                <Card.Divider />
                <Text style={styles.mealText}>{mealData.lunch}</Text>
            </Card>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Evening Snack</Card.Title>
                <Card.Divider />
                <Text style={styles.mealText}>{mealData.evening_snack}</Text>
            </Card>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Dinner</Card.Title>
                <Card.Divider />
                <Text style={styles.mealText}>{mealData.dinner}</Text>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    scrollContent: {
        paddingBottom: 80, // Adjusts bottom padding to avoid overlap with bottom tabs
    },
    card: {
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        color: '#4CAF50',
    },
    mealText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginVertical: 10,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 16,
        color: '#333',
        marginVertical: 10,
        textAlign: 'center',
    },
});

export default FoodSuggestionScreen;
