import React, { useState, useEffect } from "react";
import {
  FlatList,
  Button,
  Platform,
  View,
  Text,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as productActions from "../../store/actions/products";

import Colors from "../../constants/Colors";

const UserProductsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const userProducts = useSelector((state) => state.products.userProducts);
  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("Something went wrong", error, [{ text: "Okay" }]);
      setError();
    }
  }, [error]);

  const deleteHandler = (itemId) => {
    Alert.alert("Are you shure?", "Do you really want to delete this item?", [
      {
        text: "NO",
        style: "default",
      },
      {
        text: "YES",
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);

          try {
            await dispatch(productActions.deleteProduct(itemId));
            setIsLoading(false);
          } catch (err) {
            setIsLoading(false);
            setError(err.message);
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (!userProducts.length) {
    return (
      <View style={styles.centered}>
        <Text>There is on item. Create new one!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => editProductHandler(itemData.item.id)}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => editProductHandler(itemData.item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProductsScreen;
