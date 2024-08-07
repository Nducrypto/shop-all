import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {useOrderState, userOrdersHistory} from '../recoilState/orderState';
import {useUserState} from '../../components/recoilState/userState';
import globalStyle from '../../constants/globalStyle';

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
      <View style={styles.noOrderContainer}>
        <Text style={styles.noOrderHeader}>No Orders Placed</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.orderList}
      data={userOrder}
      renderItem={({item: order, index}) => (
        <View key={order?.orderId} style={styles.orderCard}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderHeaderText}>
              Order {userOrder.length - index}
            </Text>
            <Text style={styles.title}>Email: {order?.email}</Text>
            <Text style={styles.title}>Status: {order?.status}</Text>
            <Text style={styles.title}>
              ID: {`***${order?.userId.slice(-3)}`}
            </Text>
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.subtotal}>
              &#8358; {Intl.NumberFormat().format(order?.subTotal)}
            </Text>
            <View style={styles.itemsList}>
              <View style={styles.items}>
                <FlatList
                  data={order.items}
                  renderItem={({item, index}) => {
                    return (
                      <View key={index} style={styles.item}>
                        <Text style={styles.itemText}>Item {index + 1}</Text>
                        <Text style={styles.sharedText}>{item.brand}</Text>
                        <Text style={styles.sharedText}>
                          Model: {item.title}
                        </Text>
                        <Text style={styles.itemPrice}>
                          &#8358; {Intl.NumberFormat().format(item.price)}
                        </Text>
                        <Text style={styles.sharedText}>
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

const styles = StyleSheet.create({
  noOrderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
  },
  orderList: {
    padding: 5,
  },
  title: {
    color: 'white',
  },
  noOrderHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  orderHeader: {
    marginBottom: 10,
    backgroundColor: globalStyle.COLORS.DARKGREEN,
    padding: 10,
    borderRadius: 10,
  },
  orderHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  orderDetails: {
    flexDirection: 'column',
    marginTop: 10,
  },
  subtotal: {
    fontWeight: 'bold',
    color: 'red',
    fontSize: 18,
  },
  itemsList: {
    borderTopWidth: 1,
    borderColor: '#DDD',
    paddingTop: 10,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sharedText: {
    color: 'black',
  },
  itemPrice: {
    fontSize: 16,
    color: globalStyle.COLORS.GRADIENT_START,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Order;
