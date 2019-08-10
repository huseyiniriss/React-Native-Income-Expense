import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  TextInput,
  Picker,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import SqliteHelper from '../../util/SqliteHelper';

const AddIncomeExpense = () => {
  const [date, setDate] = React.useState(moment().format('DD.MM.YYYY'));
  const [type, setType] = React.useState(1);
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [disabledInput, setDisabledInput] = React.useState(false);

  const setInitialState = () => {
    setDescription('');
    setAmount(0);
  };

  const addIncomeExpense = () => {
    if (description.length === 0 || amount === 0) {
      showSimpleMessage('Uyarı', 'Boş alan bırakmayınız.', 'warning', { floating: true });
    } else {
      setDisabledInput(true);
      SqliteHelper.insertIncome({
        date, type, description, amount,
      })
        .then((result) => {
          if (result.insertId) {
            setInitialState();
            setDisabledInput(false);
            showSimpleMessage('Başarılı', 'Eklendi!', 'success', { floating: true });
          }
        });
    }
  };

  const showSimpleMessage = (title, msg, type = 'default', props = {}) => {
    const message = {
      message: title,
      description: msg,
      icon: { icon: 'auto', position: 'left' },
      type,
      ...props,
    };
    showMessage(message);
  };

  return (
    <View style={styles.root}>

      <DatePicker
        disabled={disabledInput}
        style={{ width: 200, marginTop: 24 }}
        date={date}
        mode="date"
        placeholder="select date"
        format="DD.MM.YYYY"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        androidMode="spinner"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
        }}
        onDateChange={(date) => { setDate(date); }}
      />
      <Picker
        enabled={!disabledInput}
        selectedValue={type}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
      >
        <Picker.Item label="Gelir" value={1} />
        <Picker.Item label="Gider" value={0} />
      </Picker>

      <TextInput
        editable={!disabledInput}
        placeholder="Miktar"
        onChangeText={(text) => setAmount(text)}
        style={{ height: 50, width: 200, borderWidth: 0.5 }}
        keyboardType="numeric"
        value={amount}
      />

      <TextInput
        editable={!disabledInput}
        placeholder="Açıklama"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
        style={{
          height: 100, width: 200, borderWidth: 0.5, marginTop: 8, textAlignVertical: 'top', marginBottom: 8,
        }}
      />

      <Button
        disabled={disabledInput}
        onPress={addIncomeExpense}
        title="KAYDET"
        style={{ height: 50, width: 200 }}
        color="#075E54"
      />
      <FlashMessage position="top" style={{ zIndex: 9999 }} animated />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default AddIncomeExpense;
