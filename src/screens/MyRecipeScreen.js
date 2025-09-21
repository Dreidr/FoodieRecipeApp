import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from storage
  const fetchrecipes = async () => {
    try {
      setLoading(true);
      const stored = await AsyncStorage.getItem("customrecipes");
      const parsed = stored ? JSON.parse(stored) : [];
      setrecipes(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      console.error("Failed to load customrecipes:", e);
      setrecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchrecipes();

    // refresh when coming back to this screen
    const unsub = navigation.addListener("focus", fetchrecipes);
    return unsub;
  }, [navigation]);

  const handleAddrecipe = () => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: null, // creating new
      recipeIndex: null,
    });
  };

  // Open for quick edit when tapping the card
  const handlerecipeClick = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
      // Optional callback; list also refreshes on focus
      onrecipeEdited: async () => {
        await fetchrecipes();
      },
    });
  };

const deleterecipe = async (index) => {
  try {
    const updated = [...recipes];     // copy current state
    updated.splice(index, 1);         // remove 1 at position index
    await AsyncStorage.setItem("customrecipes", JSON.stringify(updated));
    setrecipes(updated);              // update state so UI refreshes
  } catch (error) {
    console.error("Error deleting the recipe:", error);
  }
};


  const editrecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
      onrecipeEdited: async () => {
        await fetchrecipes();
      },
    });
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={handleAddrecipe} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New Recipe</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {recipes.length === 0 ? (
            <Text style={styles.norecipesText}> Nothing added yet. Tap 'Add New recipe'.</Text>
          ) : (
            recipes.map((recipe, index) => (
             <View
                key={`recipe-${index}`}
                style={styles.recipeCard}
              >



                <TouchableOpacity
                  testID="handlerecipeBtn"
                  onPress={() => handlerecipeClick(recipe, index)}
                  activeOpacity={0.9}
                >
                  {/* Image */}
                  {recipe?.image ? (
                    <Image
                      source={{ uri: recipe.image }}
                      style={styles.recipeImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={[
                        styles.recipeImage,
                        { alignItems: "center", justifyContent: "center", backgroundColor: "#eee" },
                      ]}
                    >
                      <Text style={{ color: "#6B7280" }}>No image</Text>
                    </View>
                  )}

                  {/* Title + Description */}
                  <Text style={styles.recipeTitle}>{recipe.title || "Untitled"}</Text>
                  <Text style={styles.recipeDescription} testID="recipeDescp">
                    {recipe.description || "No description"}
                  </Text>
                </TouchableOpacity>

                {/* Edit and Delete Buttons */}
                <View style={styles.actionButtonsContainer} testID="editDeleteButtons">
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editrecipe(recipe, index)}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>

               <TouchableOpacity
  style={styles.deleteButton}
  onPress={() => deleterecipe(index)}
>
  <Text style={styles.deleteButtonText}>Delete</Text>
</TouchableOpacity>



                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: "#F9FAFB",
  },

  addButton: {
    backgroundColor: "#4F75FF",
    padding: wp(0.7),
    alignItems: "center",
    borderRadius: 5,
    width: 300,
    alignSelf: "center", // ✅ center horizontally
    marginTop: hp(2),
    marginBottom: hp(4), // ✅ add space below
  },

  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2.2),
  },
  scrollContainer: {
    paddingBottom: hp(2),
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  norecipesText: {
    textAlign: "center",
    fontSize: hp(2),
    color: "#6B7280",
    marginTop: hp(5),
  },
  recipeCard: {
    width: 400,
    height: 300,
    backgroundColor: "#fff",
    padding: wp(3),
    borderRadius: 8,
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  recipeImage: {
    width: 300,
    height: 150,
    borderRadius: 8,
    marginBottom: hp(1),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#111827",
    marginBottom: hp(0.5),
  },
  recipeDescription: {
    fontSize: hp(1.8),
    color: "#6B7280",
    marginBottom: hp(1.5),
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  editButton: {
    backgroundColor: "#34D399",
    padding: wp(0.5),
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
  deleteButton: {
    backgroundColor: "#4F75FF",
    padding: wp(0.5),
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
});
