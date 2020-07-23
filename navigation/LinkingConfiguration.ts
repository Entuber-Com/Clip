import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          HomeScreenTab: {
            screens: {
              HomeScreen: 'home',
            },
          },
          BillScreenTab: {
            screens: {
              BillScreen: 'bill',
              PaymentHistory: 'payment-history'
            },
          },
          OutageScreenTab: {
            screens: {
              OutageScreen: 'outage',
            },
          },
          MoreOptionsScreenTab: {
            screens: {
              MoreOptionsScreen: 'more',
            },
          },
        },
      },
      ViewBill: {
        screens: {
          ViewBill: 'view-bill'
        }
      },
      NotFound: '*',
    },
  },
};
