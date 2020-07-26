export const AppData = {
    "Customer": 
        {
            "Customer Number": "500001",
            "Customer Name": "David Black",
            "Customer Address": "26, High Street, Poughkeepsie, NY 12601",
            "Functional Location": "30001",
            "Connection Object": "50001",
            "Device": "909090",
            "Device Type": "Hudson",
            "Details": "Smart",
            "Charges": " $1,866.43 ",
            "Date": "7/29/20",
            "Usage": [
                {
                    "id": "1",
                    "Icon": 'plug',
                    "IconType": "FontAwesome5",
                    "Title": "Current Electric Usage",
                    "Default": "Dollars",
                    "Options": ["$", "kWh"],
                    "DefaultIndex": 0,
                    "Dollars": {
                        "Daily": " $20.39 ",
                        "Total": " $632.21 "    
                    },
                    "kWh": {
                        "Daily": " 112.3 kWh ",
                        "Total": " 3480 kWh ",
                    },
                    "Change": "3.40%"
                }, 
                {
                    "id": "2",
                    "Icon": 'flame',
                    "IconType": "Ionicons",
                    "Title": "Current Gas Usage",
                    "Default": "Dollars",
                    "Options": ["$", "thm"],
                    "DefaultIndex": 0,
                    "Dollars": {
                        "Daily": " $7.46 ",
                        "Total": " $231.14 "     
                    },
                    "thm": {
                        "Daily": " 9.9 thm ",
                        "Total": " 306.6 thm ",
                    },
                    "Change": "-5.30%",
                }
            ]
        },
    "Bill History": [
            {
                "Date": "6/20/20",
                "Amount": " $700.00 ",
                "Activity": "Posted",
                "Details": {
                    "Created": "06/20/2020",
                    "ConfirmationID": "340601304003",
                    "Payment_Method": "Pay by app",
                    "Status": "Posted"
                }
            },
            {
                "Date": "5/7/20",
                "Amount": " $1,200.00 ",
                "Activity": "Posted",
                "Details": {
                    "Created": "05/07/2020",
                    "ConfirmationID": "240901260319",
                    "Payment_Method": "Pay by Web",
                    "Status": "Posted"
                }
            },
            {
                "Date": "3/10/20",
                "Amount": " $775.00 ",
                "Activity": "Posted",
                "Details": {
                    "Created": "03/10/2020",
                    "ConfirmationID": "PLWUN200310001/003358",
                    "Payment_Method": "Credit Card",
                    "Status": "Posted"
                }
            },
            {
                "Date": "2/7/20",
                "Amount": " $743.73 ",
                "Activity": "Posted",
                "Details": {
                    "Created": "02/07/2020",
                    "ConfirmationID": "PLWUN200207001/001922",
                    "Payment_Method": "Credit Card",
                    "Status": "Posted"
                }
            },
            {
                "Date": "12/24/19",
                "Amount": " $800.00 ",
                "Activity": "Posted",
                "Details": {
                    "Created": "12/24/2019",
                    "ConfirmationID": "PLWUN191224001/001616",
                    "Payment_Method": "Credit Card",
                    "Status": "Posted"
                }
            },
            {
                "Date": "10/29/19",
                "Amount": " $1,485.62 ",
                "Activity": "Posted",
                "Details": {
                    "Created": "10/29/2019",
                    "ConfirmationID": "PLWUN191029001/001559",
                    "Payment_Method": "Credit Card",
                    "Status": "Posted"
                }
            },
            {
                "Date": "9/23/19",
                "Amount": " $1,000.00 ",
                "Activity": "Posted",
                "Details": {
                    "Created": "09/23/2019",
                    "ConfirmationID": "PLWUN190923001/000040",
                    "Payment_Method": "Credit Card",
                    "Status": "Posted"
                }
            },
            {
                "Date": "9/5/19",
                "Amount": " $1,000.00 ",
                "Activity": "Posted",
                "Details": {
                    "Created": "09/05/2019",
                    "ConfirmationID": "PLWUN190905001/003630",
                    "Payment_Method": "Credit Card",
                    "Status": "Posted"
                }
            },
            {
                "Date": "7/22/19",
                "Amount": " $1,400.00 ",
                "Activity": "Posted",
                "Details": {
                    "Created": "07/22/2019",
                    "ConfirmationID": "PLWUN190722001/002265",
                    "Payment_Method": "Credit Card",
                    "Status": "Posted"
                }
            },
            {
                "Date": "5/22/19",
                "Amount": " $2,000.00 ",
                "Activity": "Posted",
                "Details": {
                    "Created": "05/22/2019",
                    "ConfirmationID": "PLWUN190522001/002673",
                    "Payment_Method": "Credit Card",
                    "Status": "Posted"
                }
            }
    ],
    "Bill Breakdown": [
        {
            "Type": "Gas delivery",
            "Percent": "12%",
            "PercentValue":12,
            "Cost": "$105.98"
        },
        {
            "Type": "Gas Supply",
            "Percent": "14%",
            "PercentValue":14,
            "Cost": "$125.16"
        },
        {
            "Type": "Electric Delivery",
            "Percent": "29%",
            "PercentValue":29,
            "Cost": "$248.04"
        },
        {
            "Type": "Electric Supply",
            "Percent": "44%",
            "PercentValue":44,
            "Cost": "$384.17"
        }
    ],
    "Bill Usage": {
        "Electric": [{
            "Month": "April",
            "Usage": 3.13,
            "Avg. Temprature (Deg F)": "50.00"
        },
        {
            "Month": "May",
            "Usage": 3.41,
            "Avg. Temprature (Deg F)": "51.38"
        },
        {
            "Month": "June",
            "Usage": 5.40,
            "Avg. Temprature (Deg F)": "67.03"
        },
        {
            "Month": "July",
            "Usage": 3.48,
            "Avg. Temprature (Deg F)": "76.97"
        }],
        "Gas": [
        {
            "Month": "April",
            "Usage": 16.00,
            "Avg. Temprature (Deg F)": "50.00"
        },
        {
            "Month": "May",
            "Usage": 17.30,
            "Avg. Temprature (Deg F)": "51.38"
        },
        {
            "Month": "June",
            "Usage": 10.60,
            "Avg. Temprature (Deg F)": "67.03"
        },
        {
            "Month": "July",
            "Usage": 9.90,
            "Avg. Temprature (Deg F)": "76.97"
        }]
    }
}
