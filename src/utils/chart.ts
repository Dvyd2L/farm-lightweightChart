import {
  BarData,
  ChartOptions,
  ColorType,
  createChart,
  DeepPartial,
  IChartApi,
  ISeriesApi,
  SeriesOptionsMap,
  TrackingModeExitMode,
  UTCTimestamp,
} from 'lightweight-charts';

const TIMER_OFFSET = 100;

const chartOptions: DeepPartial<ChartOptions> = {
  width: 600,
  height: 400,
  trackingMode: { exitMode: TrackingModeExitMode.OnNextTap },
  layout: {
    textColor: 'white',
    background: { type: ColorType.Solid, color: '#2a2a2a' },
  },
  grid: {
    vertLines: { color: '#2f2f2f' },
    horzLines: { color: '#2f2f2f' },
  },
};

export const handleResize = (chart: IChartApi, htmlElement: HTMLElement) => {
  chart.applyOptions({
    width: htmlElement.clientWidth,
    height: htmlElement.clientHeight,
  });
  chart.timeScale().fitContent();
};

export const formatDate = (time: Date) => ({
  year: time.getFullYear(),
  month: time.getMonth() + 1,
  day: time.getDate(),
  hour: time.getHours(),
  minute: time.getMinutes(),
  second: time.getSeconds(),
  millisecond: time.getMilliseconds(),
});

const randomValue = (offset = 1) => {
  const sign = Math.random() < 0.5 ? -1 : 1;
  return sign * Math.random() * offset;
};

const updateData = <T extends keyof SeriesOptionsMap>(
  series: ISeriesApi<T>,
  { time = Math.floor(Date.now() / 1000) as UTCTimestamp, value = 50 }
) => {
  const newTime = Math.floor(Date.now() / 1000) as UTCTimestamp;
  const data =
    newTime > time
      ? // Nueva entrada
        {
          time: newTime,
          value: value + randomValue(),
        }
      : // Actualiza la entrada existente
        {
          time,
          value: value + randomValue(),
        };

  series.update(data);
  return data;
};

export const lightweightChart = <T extends keyof SeriesOptionsMap>(
  seriesType: T,
  htmlElement: HTMLElement
) => {
  const chart = createChart(htmlElement, chartOptions);
  const seriesOptionsMap = new Map(
    Object.entries({
      Bar: chart.addBarSeries(),
      Line: chart.addLineSeries(),
      Area: chart.addAreaSeries(),
      Baseline: chart.addBaselineSeries(),
      Candlestick: chart.addCandlestickSeries(),
      Histogram: chart.addHistogramSeries(),
      // Custom: chart.addCustomSeries(),
    })
  );
  const series = seriesOptionsMap.get(seriesType) ?? chart.addLineSeries();

  let prevState = {
    time: Math.floor(Date.now() / 1000) as UTCTimestamp,
    value: 50,
  };

  series.setData([prevState]);
  setInterval(
    () => (prevState = updateData(series, prevState)),
    TIMER_OFFSET
  );

  return { chart, series };
};

export const candleChart = (htmlElement: HTMLElement) => {
  const chart = createChart(htmlElement, chartOptions);
  const candleSeries: ISeriesApi<'Candlestick'> = chart.addCandlestickSeries();
  let prevState: BarData = {
    time: Math.floor(Date.now() / 1000) as UTCTimestamp,
    open: 50,
    high: 60,
    low: 40,
    close: 55,
  };
  const updateData = (state: BarData) => {
    const newTime = Math.floor(Date.now() / 1000) as UTCTimestamp;
    const candle: BarData =
      newTime > Number(state.time)
        ? // new
          {
            time: newTime,
            open: state.close,
            high: state.close + Math.random() * 10,
            low: state.close - Math.random() * 10,
            close: state.close + (Math.random() - 0.5) * 10,
          }
        : // update
          {
            ...state,
            high: Math.max(state.high, state.close + Math.random() * 10),
            low: Math.min(state.low, state.close - Math.random() * 10),
            close: state.close + (Math.random() - 0.5) * 10,
          };

    candleSeries.update(candle);
    return candle;
  };

  candleSeries.setData([prevState]);

  setInterval(() => {
    prevState = updateData(prevState);
  }, TIMER_OFFSET);
};
