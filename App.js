import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StudyCardsProvider } from './src/contexts/StudyCardsContext';
import CardListScreen from './src/screens/CardListScreen';
import CardEditScreen from './src/screens/CardEditScreen';
import TasksDueSoonScreen from './src/screens/TasksDueSoonScreen';


const Stack = createStackNavigator();

export default function App(){
    return (
        <StudyCardsProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="CardList"
                screenOptions={{
                    headerStyle: { backgroundColor: '#000000' }, headerTintColor: '#ffc200', headerTitleStyle: { fontSize: 20 } }}>
                    <Stack.Screen name="CardList" component={CardListScreen} options={{ title: 'Study Cards' }} />
                    <Stack.Screen name="CardEdit" component={CardEditScreen} options={{ title: 'Editar Card' }} />
                    <Stack.Screen name="TasksDueSoon" component={TasksDueSoonScreen} options={{ title: 'Tasks a Vencer'}} />
                </Stack.Navigator>
            </NavigationContainer>
        </StudyCardsProvider>
    );
};
