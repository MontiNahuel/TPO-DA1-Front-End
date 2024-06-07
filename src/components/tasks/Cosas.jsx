import React from "react";
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from "react-native";

function Cosas() {
    return (
        <View style={styles.container}>
            <Text>Cosas!</Text>
        </View>
    );
}

export default Cosas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});