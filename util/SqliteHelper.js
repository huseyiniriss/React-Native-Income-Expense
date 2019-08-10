import SQLiteWrapper from 'sqlite-js-wrapper';

const SQLite = require('react-native-sqlite-storage');

const db = SQLite.openDatabase({
  name: 'incomeexpense.db',
  createFromLocation: '~incomeexpense.db',
  location: 'Library',
}, this.openCB, this.errorCB);

const sw = new SQLiteWrapper(db);

const SqliteHelper = {
  getData: async (month, year) => await sw.query(`SELECT date,
                                           SUM(CASE WHEN type = 0 THEN amount ELSE 0 END) AS expense,
                                           SUM(CASE WHEN type = 1 THEN amount ELSE 0 END) AS income,
                                           (SUM(CASE WHEN type = 1 THEN amount ELSE 0 END) - SUM(CASE WHEN type = 0 THEN amount ELSE 0 END)) AS diff
                                    FROM tblincomeexpense 
                                    WHERE substr(date,4,2) = '${month}' AND substr(date,7,4) = '${year}'
                                    GROUP BY date`),
  insertIncome: async (data) => await sw.insert('tblincomeexpense', data),
  deleteIncomeExpense: async (id) => await sw
    .table('tblincomeexpense')
    .where('id', id)
    .delete(),
  getDetailData: async (date) => sw.query(`SELECT id,description,amount,
                                           CASE 
                                                WHEN type = 1 THEN 'Gelir'
                                                WHEN type = 0 THEN 'Gider'
                                                END AS type
                                    FROM tblincomeexpense
                                    WHERE date = '${date}'`),
};

export default SqliteHelper;
