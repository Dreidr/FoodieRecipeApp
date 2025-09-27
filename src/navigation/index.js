import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import MyRecipeScreen from "../screens/MyRecipeScreen";
import CustomRecipesScreen from "../screens/CustomRecipesScreen";
import RecipesFormScreen from "../screens/RecipesFormScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";


const Stack = (Platform.OS === 'ios' || Platform.OS === 'android')
  ? createNativeStackNavigator()
  : createStackNavigator();


function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
        
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} options={{ title: "Details" }}   />
        <Stack.Screen name="MyFood" component={MyRecipeScreen}  options={{ title: "My recipes" }}  />
        <Stack.Screen name="CustomRecipesScreen" component={CustomRecipesScreen} options={{ title: "Custom recipe" }}  />
        <Stack.Screen name="RecipesFormScreen" component={RecipesFormScreen} options={{ title: "Add a recipe" }}  />
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} options={{ title: "Favorites" }}   />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
