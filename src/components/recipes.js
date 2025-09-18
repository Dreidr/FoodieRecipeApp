import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Recipes({ foods = [], categories = [] }) {
  const navigation = useNavigation();

  const keyExtractor = (item, index) =>
    item.idFood?.toString?.() || `${item.recipeName}-${index}`;

  const renderItem = ({ item }) => (
    <ArticleCard item={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <View testID="recipesDisplay" style={{ flex: 1 }}>
        <FlatList
          data={foods}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: hp(2) }}
        />
      </View>
    </View>
  );
}

const ArticleCard = ({ item, navigation }) => {
  const handlePress = () => {
      console.log('GO DETAIL:', item.recipeName); // should print on tap

    navigation.navigate("RecipeDetailScreen", item); // ✅ pass the recipe object directly

  };

  return (
    <View style={styles.cardContainer} testID="articleDisplay">
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
        <Image
          source={{ uri: item.recipeImage }}
          style={[styles.articleImage, { height: hp(20) }]}
          resizeMode="cover"
        />
        <Text style={styles.articleText} numberOfLines={1}>
          {item.recipeName}
        </Text>
        <Text style={styles.articleDescription} numberOfLines={2}>
          {item.cookingDescription}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    marginBottom: hp(1.5),
    marginHorizontal: wp(1),
  },
  articleImage: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  articleText: {
    fontSize: hp(1.8),
    fontWeight: "700",
    color: "#111827",
    marginTop: hp(0.8),
  },
  articleDescription: {
    fontSize: hp(1.4),
    color: "#6B7280",
    marginTop: hp(0.3),
  },
  row: {
    justifyContent: "space-between",
  },
});
