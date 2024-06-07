import react from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function Home() {
    return (
        <View style= {styles.container}>
            <Text>Home</Text>
            <Button title='Login' onPress={() => alert('Login')}/>
            <Button title='Register' onPress={() => alert('Register')}/>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});