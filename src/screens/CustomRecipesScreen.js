import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useDispatch, useSelector } from "react-redux";
  import { toggleFavorite } from "../redux/favoritesSlice";
  
  export default function CustomRecipesScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const { recipe } = route.params || {};

  const favoriteRecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  ) || [];

  const keyOf = (r) => r?.recipeId || r?.idFood || r?.id || r?.title;

 const isFavourite = favoriteRecipes.some((fav) => keyOf(fav) === keyOf(recipe));

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Recipe Details Available</Text>
      </View>
    );
  }

const handleToggleFavorite = () => {
  console.log("fav toggle:", keyOf(recipe));   // debug tap
  dispatch(toggleFavorite(recipe));
};

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      testID="scrollContent"
    >
      {/* Image */}
      <View style={styles.imageContainer} testID="imageContainer">
        {recipe?.image ? (
          <Image
            source={{ uri: recipe.image }}
            style={[styles.articleImage, { height: hp(30) }]}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.articleImage,
              { height: hp(30), alignItems: "center", justifyContent: "center", backgroundColor: "#eee" },
            ]}
          >
            <Text>No image</Text>
          </View>
        )}
      </View>

      {/* Buttons (in normal flow) */}
      <View style={styles.topButtonsContainer} testID="topButtonsContainer">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Text>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* Details */}
      <View style={styles.contentContainer} testID="contentContainer">
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <View style={styles.sectionContainer}>
          <Text style={styles.contentText}>{recipe.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 30,
    },
    imageContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: hp(2),
      alignItems: "center",
    },
    recipeImage: {
      width: wp(98),
      height: hp(50),
      borderRadius: 35,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      marginTop: 4,
    },
    contentContainer: {
      paddingHorizontal: wp(4),
      paddingTop: hp(4),
    },
    recipeTitle: {
      fontSize: hp(3),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(2),
    },
    sectionContainer: {
      marginBottom: hp(2),
    },
    sectionTitle: {
      fontSize: hp(2.5),
      fontWeight: "bold",
      color: "#4B5563",
      marginBottom: hp(1),
    },
    topButtonsContainer: {
      width: "100%",
      position: "absolute",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: hp(4),
    },
    backButton: {
      padding: 8,
      borderRadius: 50,
      marginLeft: wp(5),
      backgroundColor: "white",
    },
    favoriteButton: {
      padding: 8,
      borderRadius: 50,
      marginRight: wp(5),
      backgroundColor: "white",
    },
    contentText: {
      fontSize: hp(2),
      color: "#4B5563",
    },

    articleImage: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#f3f4f6", 
  },
  });
  