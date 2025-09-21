import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();

  // Assuming you have a similar structure for recipes in your Redux store
  const favoriteRecipes = useSelector((state) => state.favorites);
  const favoriteRecipesList = favoriteRecipes?.favoriterecipes || [];
  console.log(favoriteRecipes.favoriterecipes);
  console.log('favoriteRecipesList',favoriteRecipesList);
  
  

  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
      </View>
    );
  }

  return (
    <>

     {/* Favorites Detail */}
          <FlatList
            data={favoriteRecipesList}
            keyExtractor={(item, idx) =>
              (item.recipeId || item.idFood || idx).toString()
            }
            contentContainerStyle={styles.listContentContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.cardContainer}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("RecipeDetailScreen", item)} // pass item directly
              >
                <Image
                  source={{ uri: item.recipeImage }}
                  style={styles.recipeImage}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.recipeTitle} numberOfLines={1}>
                    {item.recipeName}
                  </Text>
                  <Text style={{ color: "#6B7280", marginTop: 4 }} numberOfLines={1}>
                    {item.recipeCategory || item.category || "—"}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
    </>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280", // text-neutral-600
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
});
