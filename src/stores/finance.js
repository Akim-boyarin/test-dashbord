import { defineStore } from 'pinia'

export const useFinanceStore = defineStore('finance', {
    state() {
        return {
            headers: [
                'Показатель',
                'Текущий день',
                'Вчера',
                'Этот день недели',
            ],
            data: [
                {
                    id: 1,
                    title: 'Выручка, руб.',
                    values: [400586, 500489, 300241, 453215, 520479, 488569, 502549],
                    type: 'data_string',
                    yAxisName: 'Выручка',
                },
                {
                    id: 2,
                    title: 'Наличные',
                    values: [280000, 280000, 280000, 280000, 280000, 280000, 280000],
                    type: 'data_string',
                    yAxisName: 'Наличные',
                },
                {
                    id: 3,
                    title: 'Безналичный расчет',
                    values: [100000, 100000, 100000, 100000, 100000, 100000, 100000],
                    type: 'data_string',
                    yAxisName: 'Безналичный расчет',
                },
                {
                    id: 4,
                    title: 'Кредитные карты',
                    values: [153456, 155678, 159765, 180456, 190613, 100564, 189754],
                    type: 'data_string',
                    yAxisName: 'Кредитные карты',
                },
                {
                    id: 5,
                    title: 'Средний чек, руб.',
                    values: [1500, 1100, 1600, 1200, 1400, 1600, 1700],
                    type: 'data_string',
                    yAxisName: 'Средний чек',
                },
                {
                    id: 6,
                    title: 'Средний гость, руб.',
                    values: [1800, 1300, 1400, 1600, 1100, 1300, 1100],
                    type: 'data_string',
                    yAxisName: 'Средний гость',
                },
                {
                    id: 7,
                    title: 'Удаления из чека (после оплаты), руб.',
                    values: [1100, 1300, 1200, 1400, 1600, 1400, 1600],
                    type: 'data_string',
                    yAxisName: 'Удаления из чека',
                },
                {
                    id: 8,
                    title: 'Удаления из чека (до оплаты), руб.',
                    values: [1300, 1500, 1400, 1600, 1800, 1600, 1800],
                    type: 'data_string',
                    yAxisName: 'Удаления из чека',
                },
                {
                    id: 9,
                    title: 'Чеков',
                    values: [34, 65, 32, 54, 32, 57, 40],
                    type: 'data_string',
                    yAxisName: 'Количество чеков',
                },
                {
                    id: 10,
                    title: 'Количество гостей',
                    values: [44, 75, 42, 64, 42, 67, 50],
                    type: 'data_string',
                    yAxisName: 'Гостей',
                },
                {
                    id: 11,
                    type: 'graphic',
                    isOpened: false,
                }
            ],
        };
    },
    getters: {
        headersList() {
            return this.headers;
        },
        convertedFinanceDataList() {
            return this.data.map(item => {
                // type
                let type = item.type;

                // id
                let id = item.id;

                if (type === 'graphic') {
                    let isOpened = item.isOpened;

                    return {
                        id,
                        isOpened,
                        type,
                    };
                }

                // title
                let title = item.title;

                // all days values
                let allDaysValues = item.values;

                // day values to show
                let todayIndex = allDaysValues.length - 1;
                let todayValue = allDaysValues[todayIndex];

                let yesterdayIndex = allDaysValues.length - 2;
                let yesterdayValue = allDaysValues[yesterdayIndex];

                let middleDayIndex = 2;
                let middleDayValue = allDaysValues[middleDayIndex];

                // changing percent
                let changingPercent = +(todayValue * 100 / yesterdayValue).toFixed(0) - 100;

                // changing status
                let changingStatus = "";

                if (changingPercent < 0) {
                    changingStatus = "low";
                } else if (!changingPercent) {
                    changingStatus = "none";
                } else {
                    changingStatus = "high";
                }

                // middle day is less
                let middleDayIsLess = (todayValue > middleDayValue);

                return {
                    type,
                    id,
                    title,
                    allDaysValues,
                    todayValue,
                    yesterdayValue,
                    middleDayValue,
                    changingPercent,
                    changingStatus,
                    middleDayIsLess,
                };

            });
        },
    },
    actions: {
        changeGraphicPosition(dataId) {
            let graphicIndex = this.data.findIndex(element => element.type === 'graphic');
            let graphicData = this.data.splice(graphicIndex, 1)[0];
            let dataIndex = this.data.findIndex(item => item.id === dataId);
            this.data.splice(dataIndex + 1, 0, graphicData);
        },
        showGraphic() {
            let graphicIndex = this.data.findIndex(element => element.type === 'graphic');
            this.data[graphicIndex].isOpened = true;
        }
    },
});