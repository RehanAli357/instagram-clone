import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ListRenderItem
} from "react-native";
import { SearchBar } from "react-native-elements";
import FooterNavigation from "../Component/FooterNavigation";

interface SearchResult {
  id: string;
  image: any;
  search: string;
}

const searchResults: SearchResult[] = [
  { id: "1", image: require("../assets/game.jpg"), search: "game" },
  { id: "2", image: require("../assets/game1.jpg"), search: "game" },
  { id: "3", image: require("../assets/game2.jpg"), search: "game" },
  { id: "4", image: require("../assets/friends1.jpg"), search: "friends" },
  { id: "5", image: require("../assets/friends2.jpg"), search: "friends" },
  { id: "6", image: require("../assets/friends3.jpg"), search: "friends" },
  { id: "7", image: require("../assets/friends4.jpg"), search: "friends" },
  { id: "8", image: require("../assets/car.jpg"), search: "cars" },
  { id: "9", image: require("../assets/car1.jpg"), search: "cars" },
  { id: "10", image: require("../assets/car2.jpg"), search: "cars" },
  { id: "11", image: require("../assets/car3.jpg"), search: "cars" },
  { id: "12", image: require("../assets/monuments.jpg"), search: "monuments" },
  { id: "13", image: require("../assets/monuments1.jpg"), search: "monuments" },
  { id: "14", image: require("../assets/monuments2.jpg"), search: "monuments" },
];

interface SearchScreenProps {
  navigation: any; 
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [search, setSearch] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>(searchResults);

  const updateSearch = (search: string):void => {
    setSearch(search);
    if (search === "") {
      setFilteredResults(searchResults);
    } else {
      const filtered = searchResults.filter((item) => item.search.includes(search));
      setFilteredResults(filtered);
    }
  };

  const renderItem: ListRenderItem<SearchResult> = ({ item }) => (
    <TouchableOpacity style={styles.imageContainer}>
      <Image source={item.image} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={(text: string) => updateSearch(text)}
        value={search}
        lightTheme
        round
        inputContainerStyle={styles.searchInputContainer}
        containerStyle={styles.searchContainer}
      />
      <FlatList
        data={filteredResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
      <FooterNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchInputContainer: {
    backgroundColor: "#eee",
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 2,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default SearchScreen;
