const SQLite = require('react-native-sqlite-storage');
import SQLiteWrapper from 'sqlite-js-wrapper';

const db = SQLite.openDatabase({
    name: 'incomeexpense.db',
    createFromLocation: "~incomeexpense.db",
    location: 'Library'
}, this.openCB, this.errorCB);

const sw = new SQLiteWrapper(db);

const SqliteHelper = {
    getData: async (month , year) => {
        return await sw.query(`SELECT date,
                                           SUM(CASE WHEN type = 0 THEN amount ELSE 0 END) AS expense,
                                           SUM(CASE WHEN type = 1 THEN amount ELSE 0 END) AS income
                                    FROM tblincomeexpense 
                                    WHERE substr(date,4,2) = '${month}' AND substr(date,7,4) = '${year}' GROUP BY date`);
    },
    inserIncome: async (data) => {
        return await sw.insert('tblincomeexpense', data);
    },
};

export default SqliteHelper;