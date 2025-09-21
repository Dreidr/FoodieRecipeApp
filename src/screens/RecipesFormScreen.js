import { View,Text,TextInput,TouchableOpacity,Image,StyleSheet,} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

 const saverecipe = async () => {
  try {
    // 1) Initialize a new recipe object
    const newrecipe = {
      title: title?.trim() || "",
      image: image?.trim() || "",
      description: description?.trim() || "",
    };

    // 2) Retrieve existing recipes from AsyncStorage
    const stored = await AsyncStorage.getItem("customrecipes");
    let recipes = [];
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        recipes = Array.isArray(parsed) ? parsed : [];
      } catch {
        recipes = [];
      }
    }

    // 3) Update or add a recipe
    if (recipeToEdit && Number.isInteger(recipeIndex)) {
      // Editing existing
      recipes[recipeIndex] = newrecipe;
      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));

      // 4) Handle callbacks
      if (typeof onrecipeEdited === "function") {
        onrecipeEdited(newrecipe, recipeIndex);
      }
    } else {
      // Adding new
      recipes.push(newrecipe);
      await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
    }

    // 5) Navigate back on success
    navigation.goBack();
  } catch (err) {
    // 6) Error handling
    console.error("Error saving recipe:", err);
  }
};


  return (
    <View style={styles.container}>



      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height:200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
