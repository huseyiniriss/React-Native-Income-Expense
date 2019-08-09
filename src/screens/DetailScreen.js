import React,{useEffect} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
} from 'react-native';
import SqliteHelper from '../../util/SqliteHelper'

const IncomeExpense = props => {

    const [data, setData] = React.useState([]);

    useEffect(() => {
        SqliteHelper.getDetailData(props.date).then(result => setData(result.data));
    },[]);

    const ListItem = (props) => {
        return (
            <View style={{flexDirection:'row',flex: 1}}>
                <Text style={[styles.item, {flex:2,borderRightWidth:0.5}]}>{props.data.type}</Text>
                <Text style={[styles.item, {flex:6,borderRightWidth:0.5}]}>{props.data.description}</Text>
                <Text style={[styles.item, {flex:2}]}>{props.data.amount}</Text>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <View style={{flexDirection:'row', backgroundColor: '#dddddd'}}>
                <Text style={[styles.item, {flex:2,borderRightWidth:0.5}]}>Tur</Text>
                <Text style={[styles.item, {flex:6,borderRightWidth:0.5}]}>Aciklama</Text>
                <Text style={[styles.item, {flex:2}]}>Fiyat</Text>
            </View>
            <FlatList
                data={data}
                renderItem={({item}, i) => <ListItem data={item} key={i} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor:'#fff'
    },
    item: {
        textAlign:'center',
        borderBottomWidth: 0.5,
        padding: 4,
        fontSize: 14,
    },
});

export default IncomeExpense;
