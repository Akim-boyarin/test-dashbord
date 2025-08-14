<script>
import {useFinanceStore} from "../stores/finance.js";

export default {
  name: "FinanceTable",
  setup() {
    const financeStore = useFinanceStore();

    return {
      financeStore,
    };
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'spline'
        },
        title: {
          text: ''
        },
        series: [{
          data: [10, 1, 2, 7]
        }],
        xAxis: {
          categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
          title: { text: 'День недели' }
        },
        yAxis: {
          title: { text: '' },
          min: 0
        }
      },
      title: '',

    }
  },
  methods: {
    formatNumberWithSpaces(num) {
      let str = String(num);
      if (str.length <= 3) return str;

      return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },
    openGraphicForRow(incomingData) {
      this.financeStore.changeGraphicPosition(incomingData.id);
      this.setGraphicForData(incomingData);
      this.financeStore.showGraphic();
    },
    setGraphicForData(incomingData) {
      try {
        this.chartOptions.title.text = incomingData.title;
        this.chartOptions.yAxis.title = incomingData.yAxisName;
        let allDaysValues = incomingData.allDaysValues;
        this.chartOptions.yAxis.max = Math.max(...allDaysValues) + Math.min(...allDaysValues);
        this.chartOptions.series[0].data = allDaysValues;
      } catch (err) {
        console.log(`${err.name}. ${err.message}`);
      }
    },
  },

}
</script>

<template>
  <div class="finance-table">
    <div class="finance-table__headers-row">
      <div
          v-for="(header, headerIndex) in financeStore.headersList"
          :key="headerIndex"
          class="finance-table__header"
          :class="{ 'finance-table__header_first': !headerIndex }"
      >
        {{ header }}
      </div>
    </div>
    <div class="finance-table__content">
      <div class="finance-data">
        <div
            v-for="(dataPart) in financeStore.convertedFinanceDataList"
            :key="dataPart.id"
            class="finance-data__row"
            @click="openGraphicForRow(dataPart)">
          <template v-if="dataPart.type === 'data_string'">
            <div class="finance-row">
              <!-- title -->
              <div class="finance-row__block finance-row__title">
                {{ dataPart.title }}
              </div>
              <!-- today value -->
              <div class="finance-row__block finance-row__today-value">
                {{ formatNumberWithSpaces(dataPart.todayValue) }}
              </div>
              <!-- yesterday value -->
              <div class="finance-row__block finance-row__yesterday-value" :class="`finance-row__yesterday-value_${dataPart.changingStatus}`">
                <span class="finance-row__yesterday-value-sum">{{ formatNumberWithSpaces(dataPart.yesterdayValue) }}</span>
                <span class="finance-row__yesterday-value-percent">{{ dataPart.changingPercent }}%</span>
              </div>
              <!-- middle day value -->
              <div class="finance-row__block finance-row__middle-day-value" :class="{ 'finance-row__middle-day-value_is-less': dataPart.middleDayIsLess }">
                {{ formatNumberWithSpaces(dataPart.middleDayValue) }}
              </div>
            </div>
          </template>
          <template v-else>
            <!-- graphic-->
            <div class="finance-data__graphic" :class="{ 'finance-data__graphic_hidden': !dataPart.isOpened }">
              <highcharts :options="chartOptions" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @use '../assets/styles/scss/index' as *;

  .finance-table {
    &__headers-row {
      @include flex(row, flex-start, center);
      gap: 2px;
      margin-bottom: 2px;
      @media (min-width: 1100px) {
        gap: 3px;
        margin-bottom: 3px;
      }
    }
    &__header {
      font-family: "Roboto", sans-serif;
      font-size: 12px;
      width: 60px;
      flex-shrink: 0;
      flex-grow: 1;
      text-align: center;
      color: #a79da0;
      background-color: #f5f5f5;
      height: 40px;
      @include flex(row, center, center);
      @media (min-width: 1100px) {
        font-size: 15px;
      }
    }
    &__header_first {
      flex-grow: 1;
      @media (min-width: 680px) {
        flex-grow: 3;
      }
    }
    &__content {

    }
  }

  .finance-data {
    &__row {

    }
    &__graphic {

      &_hidden {
        display: none;
      }
    }
  }

  .finance-row {
    @include flex(row, flex-start, center);
    gap: 2px;
    margin-bottom: 2px;
    cursor: pointer;
    @media (min-width: 1100px) {
      gap: 3px;
      margin-bottom: 3px;
    }
    &__block {
      background-color: #f5f5f5;
      height: 40px;
      font-family: "Roboto", sans-serif;
      font-size: 11px;
      width: 60px;
      flex-shrink: 0;
      flex-grow: 1;
      @include flex(row, center, center);
      color: #a79da0;
      @media (min-width: 400px) {
        font-size: 12px;
      }
      @media (min-width: 1100px) {
        font-size: 15px;
      }
    }
    &__title {
      @include flex(row, flex-start, center);
      padding: 0 2px;
      @media (min-width: 400px) {
        padding: 0 4px;
      }
      @media (min-width: 680px) {
        flex-grow: 3;
      }
      @media (min-width: 1100px) {
        padding-left: 20px;
      }
    }
    &__today-value {

    }
    &__yesterday-value {
      @include flex(row, space-between, center);
      padding: 0 3px;
      @media (min-width: 400px) {
        padding: 0 6px;
        justify-content: flex-end;
      }
      @media (min-width: 1100px) {
        justify-content: center;
      }
    }
    &__yesterday-value-sum {
      @media (min-width: 1100px) {
        display: block;
        width: 60px;
        text-align: right;
      }
    }
    &__yesterday-value-percent {
      margin-left: 2px;
      @media (min-width: 400px) {
        display: block;
        width: 25px;
        margin-left: 10px;
        text-align: end;
      }
      @media (min-width: 1100px) {
        margin-left: 15px;
        width: 30px;
      }
    }
    &__middle-day-value {
      @include flex(row, flex-end, center);
      padding: 0 6px;
      @media (min-width: 1100px) {
        padding-right: 20px;
      }

      &_is-less {
        background-color: #eaf7e8;
      }
    }
  }

  // changing colors
  .finance-row__yesterday-value_low {
    background-color: #ffe5e6;
  }
  .finance-row__yesterday-value_low .finance-row__yesterday-value-percent {
    color: #ff405e;
  }
  .finance-row__yesterday-value_none .finance-row__yesterday-value-percent {
    color: #4da775;
  }
  .finance-row__yesterday-value_high {
    background-color: #eaf7e8;
  }
  .finance-row__yesterday-value_high .finance-row__yesterday-value-percent {
    color: #4da775;
  }
</style>