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
import SqliteHelper from '../../util/SqliteHelper'


const IncomeExpense = () => {

    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const [date, setDates] = React.useState([]);
    const [currentDate, setCurrentDate] = React.useState({
        month: moment().format('MM'),
        year: moment().format('YYYY')
    });

    useEffect(() => {
        SqliteHelper.getData(currentDate.month, currentDate.year.toString()).then(result => setDates(getIncomeExpenseData(currentDate.month, currentDate.year, result.data)));
    }, [SqliteHelper.getData(currentDate.month, currentDate.year.toString())]);

    const getIncomeExpenseData = (month, year, data) => {
        var daysInMonth = moment(year+'-'+month, "YYYY-MM").daysInMonth();
        var arrDays = [];
        while(daysInMonth) {
            let day = daysInMonth < 10 ? '0'+daysInMonth : daysInMonth;
            arrDays.push({
                date: day+'.'+month+'.'+year,
                income: 0,
                expense: 0
            });
            daysInMonth--;
        }
        return arrDays.map(x => Object.assign(x, data.find(y => y.date === x.date))).reverse();
    };


    const openDetailScreen = (index) => {
        Navigation.push('navigation.IncomeExpense', {
            component: {
                name: 'navigation.DetailScreen',
                passProps: {
                    date: date[index].date
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

    const List = ({item, index}) => {
        return (
            <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={[styles.item, {flex: 3.5, borderRightWidth: 0.5}]}>{item.date}</Text>
                <Text style={[styles.item, {flex: 2.5, borderRightWidth: 0.5}]}>{item.income}</Text>
                <Text style={[styles.item, {flex: 2.5, borderRightWidth: 0.5}]}>{item.expense}</Text>
                <TouchableOpacity style={[styles.item, {flex: 1.5, alignItems: 'center'}]}
                                  onPress={() => openDetailScreen(index)}>
                    <Icon name="arrow-dropright-circle" style={{fontSize: 18}}/>
                </TouchableOpacity>
            </View>
        );
    };


    const getMontIncomeExpense = direction => {
        let month, year;
        if (direction === 0) {
           if (parseInt(currentDate.month) === 1){
               month = '12';
               year = (parseInt(currentDate.year) - 1).toString();
           } else {
               month = parseInt(currentDate.month) - 1 < 10 ? '0'+(parseInt(currentDate.month) - 1) : (parseInt(currentDate.month) - 1).toString();
               year = currentDate.year;
           }
        } else {
            if (parseInt(currentDate.month) === 12){
                month = '01';
                year = (parseInt(currentDate.year) + 1).toString();
            } else {
                month = parseInt(currentDate.month) + 1 < 10 ? '0'+(parseInt(currentDate.month) + 1) : (parseInt(currentDate.month) + 1).toString();
                year = currentDate.year;
            }
        }
        setCurrentDate({month,year});
    };

    return (
        <View style={styles.root}>
            <View style={styles.topbar}>
                <TouchableOpacity onPress={() => getMontIncomeExpense(0)}>
                    <Icon name="arrow-back" style={{color: '#fff'}}/>
                </TouchableOpacity>

                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: '#fff'}}>{currentDate.year}</Text>
                    <Text style={{fontSize: 14, color: '#fff'}}>{months[parseInt(currentDate.month)-1]}</Text>
                </View>

                <TouchableOpacity onPress={() => getMontIncomeExpense(1)}>
                    <Icon name="arrow-forward" style={{color: '#fff'}}/>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', backgroundColor: '#dddddd'}}>
                <Text style={[styles.item, {flex: 3.5, borderRightWidth: 0.5}]}>Tarih</Text>
                <Text style={[styles.item, {flex: 2.5, borderRightWidth: 0.5}]}>Gelir</Text>
                <Text style={[styles.item, {flex: 2.5, borderRightWidth: 0.5}]}>Gider</Text>
                <Text style={[styles.item, {flex: 1.5}]}>Detay</Text>
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
        backgroundColor: '#fff'
    },
    topbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 50,
        backgroundColor: '#075E54'
    },
    item: {
        textAlign: 'center',
        borderBottomWidth: 0.5,
        padding: 4,
        fontSize: 14,
    },
});

export default IncomeExpense;
