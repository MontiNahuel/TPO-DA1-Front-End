import react from 'react';
import { View, Text, Button } from 'react-native';

function Home() {
    return (
        <View>
            <Text>Home</Text>
            <Button title='Login' onPress={() => alert('Login')}/>
            <Button title='Register' onPress={() => alert('Register')}/>
        </View>
    );
}

export default Home;