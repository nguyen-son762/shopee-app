import React, { FC, useMemo } from "react";
import { CartDef } from "../model/cart.model";
import { CameraRoll, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { Theme } from "app/constants/theme.constants";
import Divider from "app/components/Divider";
import CartRow from "./CartRow";
import { useStoreDispatch, useStoreState } from "app/store";

type CartRowContainerProps = {
  category: string;
  cartItem: CartDef[];
};

const CartRowContainer: FC<CartRowContainerProps> = ({ cartItem = [], category }) => {
  const { cart } = useStoreState((state) => state.cart);
  const {
    cart: { update: updateCart }
  } = useStoreDispatch();

  const isSelectAll = useMemo(() => {
    const cartFilterByCategory = cart.filter((item) => item.item.category.name === category);
    return cartFilterByCategory.every((item) => item.selected);
  }, [cart]);

  const onChangeSelectAll = () => {
    updateCart(
      cartItem.map((item) => ({
        model_id: item.model._id,
        amount: item.amount,
        selected: !isSelectAll
      }))
    );
  };

  return (
    <View className="pb-4">
      <View className="flex-row items-center px-3 gap-x-3">
        <Checkbox
          style={{
            width: 22,
            height: 22
          }}
          value={isSelectAll}
          className="text-lg"
          color={Theme.color.primary}
          onTouchEnd={onChangeSelectAll}
        />
        <Text className="text-lg font-bold my-2">{category}</Text>
      </View>
      <Divider />
      {cartItem.map((item, index) => (
        <CartRow key={`${item.model._id}${index}`} item={item} />
      ))}
    </View>
  );
};

export default CartRowContainer;
