import React, { useEffect } from 'react';
import {
  FlatList, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import Icon from 'react-native-ionicons';
import SqliteHelper from '../../util/SqliteHelper';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    textAlign: 'center',
    borderBottomWidth: 0.5,
    padding: 4,
    fontSize: 14,
  },
});

const IncomeExpense = (props) => {
  const [data, setData] = React.useState([]);

  const deleteIncomeExpense = (id) => {
    SqliteHelper.deleteIncomeExpense(id).then(() => {
      setData(data.filter((value) => value.id !== id));
    });
  };

  useEffect(() => {
    SqliteHelper.getDetailData(props.date).then((result) => setData(result.data));
  }, []);

  const ListItem = ({ data }) => (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <Text style={[styles.item, { flex: 2, borderRightWidth: 0.5 }]}>{data.type}</Text>
      <Text style={[styles.item, { flex: 4.5, borderRightWidth: 0.5 }]}>
        {data.description}
      </Text>
      <Text style={[styles.item, { flex: 2, borderRightWidth: 0.5 }]}>{data.amount}</Text>
      <TouchableOpacity
        style={[styles.item, { flex: 1.5, alignItems: 'center' }]}
        onPress={() => deleteIncomeExpense(data.id)}
      >
        <Icon name="trash" style={{ fontSize: 18 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.root}>
      <View style={{ flexDirection: 'row', backgroundColor: '#dddddd' }}>
        <Text style={[styles.item, { flex: 2, borderRightWidth: 0.5 }]}>Tur</Text>
        <Text style={[styles.item, { flex: 4.5, borderRightWidth: 0.5 }]}>Aciklama</Text>
        <Text style={[styles.item, { flex: 2, borderRightWidth: 0.5 }]}>Fiyat</Text>
        <Text style={[styles.item, { flex: 1.5 }]}>Sil</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }, i) => <ListItem data={item} key={i} />}
      />
    </View>
  );
};

export default IncomeExpense;
