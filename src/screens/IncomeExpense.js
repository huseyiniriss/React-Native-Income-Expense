import React, {useEffect} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-ionicons'
import {Navigation} from 'react-native-navigation'
import moment from "moment";

const IncomeExpense = () => {

    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const [date , setDates] = React.useState([]);
    const [currentDate, setCurrentDate] = React.useState({month:new Date().getMonth(), year:new Date().getFullYear()});

    useEffect(() => {
        setDates(getIncomeExpenseData(currentDate.month,currentDate.year));
    }, [currentDate]);


    const getIncomeExpenseData = (month, year) => {
        var date = new Date(Date.UTC(year, month, 1));
        var days = [];
        while (date.getMonth() === month) {
            days.push({date: moment(new Date(date)).format('DD.MM.YYYY'), income:Math.floor(Math.random() * 50), expense:Math.floor(Math.random() * 50)});
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    const openDetailScreen = (index) => {
        Navigation.push('navigation.IncomeExpense', {
            component: {
                name: 'navigation.DetailScreen',
                passProps: {
                    text: 'data'
                },
                options: {
                    topBar: {
                        title: {
                            text: date[index].date
                        }
                    }
                }
            }
        });
    };

    const List = ({item , index}) => {
        return (
            <View style={{flexDirection:'row',flex: 1}}>
                <Text style={[styles.item, {flex:3.5,borderRightWidth:0.5}]}>{item.date}</Text>
                <Text style={[styles.item, {flex:2.5,borderRightWidth:0.5}]}>{item.income}</Text>
                <Text style={[styles.item, {flex:2.5,borderRightWidth:0.5}]}>{item.expense}</Text>
                <TouchableOpacity style={[styles.item, {flex:1.5, alignItems:'center'}]} onPress={()=>openDetailScreen(index)} >
                    <Icon  name="arrow-dropright-circle" style={{fontSize:18}} />
                </TouchableOpacity>
            </View>
        );
    };


    const getMontIncomeExpense = direction => {
        let month;
        let year;
        if (direction === 0) {
            if (currentDate.month === 0) {
                month = 11;
                year = currentDate.year - 1;
            } else {
                month = currentDate.month - 1;
                year = currentDate.year;
            }
        } else {
            if (currentDate.month === 11) {
                month = 0;
                year = currentDate.year + 1;
            } else {
                month = currentDate.month + 1;
                year = currentDate.year;
            }

        }
        setCurrentDate({month, year});

    };

    return (
        <View style={styles.root}>
            <View style={styles.topbar}>
                <TouchableOpacity  onPress={()=>getMontIncomeExpense(0)} >
                    <Icon name="arrow-back" style={{color:'#fff'}} />
                </TouchableOpacity>

                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize:18,color:'#fff'}}>{currentDate.year}</Text>
                    <Text style={{fontSize:14,color:'#fff'}}>{months[currentDate.month]}</Text>
                </View>

                <TouchableOpacity  onPress={()=>getMontIncomeExpense(1)} >
                    <Icon name="arrow-forward" style={{color:'#fff'}} />
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.item, {flex:3.5,borderRightWidth:0.5}]}>Tarih</Text>
                <Text style={[styles.item, {flex:2.5,borderRightWidth:0.5}]}>Gelir</Text>
                <Text style={[styles.item, {flex:2.5,borderRightWidth:0.5}]}>Gider</Text>
                <Text style={[styles.item, {flex:1.5}]}>Detay</Text>
            </View>

            <FlatList
                data={date}
                renderItem={List}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={31}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor:'#fff'
    },
    topbar: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        height:50,
        backgroundColor: '#075E54'
    },
    item: {
        textAlign:'center',
        borderBottomWidth: 0.5,
        padding: 4,
        fontSize: 14,
    },
});

export default IncomeExpense;
