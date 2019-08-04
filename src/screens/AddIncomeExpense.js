/**
 * Sample React Native AddIncomeExpense
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    TextInput,
    Picker,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from "moment";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

const AddIncomeExpense = () => {

  const [date, setDate] = React.useState(moment().format("YYYY-MM-DD"));
  const [type, setType] = React.useState(1);
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState(0);

  const addIncomeExpense = () => {
      if (description.length === 0 || amount === 0){
          showSimpleMessage('Uyarı','Boş alan bırakmayınız.', 'success', {floating:true})
      }
  };

    const showSimpleMessage = (title, msg, type = "default", props = {}) => {
        const message = {
            message: title,
            description: msg,
            icon: { icon: "auto", position: "left" },
            type,
            ...props,
        };
        showMessage(message);
    };

  return (
      <View style={styles.root}>

        <DatePicker
            style={{width: 200, marginTop: 24}}
            date={date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            androidMode='spinner'
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => {setDate(date)}}
        />
          <Picker
              selectedValue={type}
              style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              <Picker.Item label="Gelir" value={1} />
              <Picker.Item label="Gider" value={0} />
          </Picker>

          <TextInput
              placeholder= 'Miktar'
              onChangeText={(text) => setAmount(text)}
              style={{height: 50, width: 200, borderWidth:0.5}}
              keyboardType={'decimal-pad'}
          />

          <TextInput
              placeholder='Açıklama'
              onChangeText={(text) => setDescription(text)}
              multiline={true}
              style={{height: 100, width: 200, borderWidth:0.5, marginTop:8, textAlignVertical: 'top', marginBottom:8}}
          />

          <Button
              onPress={addIncomeExpense}
              title={'KAYDET'}
              style={{height: 50, width: 200}}
              color={'#075E54'}
          />
          <FlashMessage position="top" style={{zIndex:9999}} animated={true} />
</View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'#fff',
    alignItems:'center'
  },
});

export default AddIncomeExpense;
