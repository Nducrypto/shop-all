import React, {useState} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import {useOrderState, userOrdersHistory} from '../../hook/useOrder';
import {useUserState} from '../../hook/useUsers';
import {orderStyles} from './orderStyles';

const Order = () => {
  const {isOrderLoading} = useOrderState();
  const {currentUser} = useUserState();
  const [isRefreshed, setIsRefreshed] = useState<boolean>(false);

  const userOrder = userOrdersHistory(currentUser.email);

  const handleRefresh = () => {
    setIsRefreshed(true);
    setTimeout(() => {
      setIsRefreshed(false);
    }, 3000);
  };

  if (!userOrder.length && !isOrderLoading) {
    return (
      <View style={orderStyles.noOrderContainer}>
        <Text style={orderStyles.noOrderHeader}>No Orders Placed</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={orderStyles.orderList}
      data={userOrder}
      renderItem={({item: order, index}) => (
        <View key={order?.orderId} style={orderStyles.orderCard}>
          <View style={orderStyles.orderHeader}>
            <Text style={orderStyles.orderHeaderText}>
              Order {userOrder.length - index}
            </Text>
            <Text style={orderStyles.title}>Email: {order?.email}</Text>
            <Text style={orderStyles.title}>Status: {order?.status}</Text>
            <Text style={orderStyles.title}>
              ID: {`***${order?.userId.slice(-3)}`}
            </Text>
          </View>
          <View style={orderStyles.orderDetails}>
            <Text style={orderStyles.subtotal}>
              &#8358; {Intl.NumberFormat().format(order?.subTotal)}
            </Text>
            <View style={orderStyles.itemsList}>
              <View style={orderStyles.items}>
                <FlatList
                  data={order.items}
                  renderItem={({item, index}) => {
                    return (
                      <View key={index} style={orderStyles.item}>
                        <Text style={orderStyles.itemText}>
                          Item {index + 1}
                        </Text>
                        <Text style={orderStyles.sharedText}>{item.brand}</Text>
                        <Text style={orderStyles.sharedText}>
                          Model: {item.title}
                        </Text>
                        <Text style={orderStyles.itemPrice}>
                          &#8358; {Intl.NumberFormat().format(item.price)}
                        </Text>
                        <Text style={orderStyles.sharedText}>
                          Quantity: {item.quantity}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      )}
      keyExtractor={item => item.orderId}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshed}
          onRefresh={handleRefresh}
          colors={['green', 'yellow']}
        />
      }
    />
  );
};

export default Order;
