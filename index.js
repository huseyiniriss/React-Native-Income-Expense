import {Navigation} from "react-native-navigation";
import AddIncomeExpense from "./src/screens/AddIncomeExpense";
import IncomeExpense from "./src/screens/IncomeExpense";
import DetailScreen from "./src/screens/DetailScreen";

Navigation.registerComponent('navigation.IncomeExpense', () => IncomeExpense);
Navigation.registerComponent('navigation.AddIncomeExpense', () => AddIncomeExpense);
Navigation.registerComponent('navigation.DetailScreen', () => DetailScreen);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                id: 'BottomTabsId',
                children: [
                    {
                        stack: {
                            id:'navigation.IncomeExpense',
                            children: [
                                {
                                    component: {
                                        name: 'navigation.IncomeExpense',
                                        id:'navigation.IncomeExpense',
                                        options: {
                                            bottomTab: {
                                                fontSize: 12,
                                                text: 'Liste',
                                                icon: require('./assets/list.png'),
                                            },
                                            bottomTabs: {
                                                titleDisplayMode: 'alwaysShow'
                                            },
                                            topBar: { visible: false, height: 0, }
                                        },
                                    }
                                }
                            ]
                        }
                    },
                    {
                        component: {
                            name: 'navigation.AddIncomeExpense',
                            options: {
                                bottomTab: {
                                    text: 'Ekle',
                                    fontSize: 12,
                                    icon: require('./assets/add.png'),
                                },
                                bottomTabs: {
                                    titleDisplayMode: 'alwaysShow'
                                },
                            }
                        }
                    },
                ],
            },
        }
    });
});

