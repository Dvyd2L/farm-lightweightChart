import { ParrafoAnimado } from './parrafo-animado.ts';
import './style.css';
import { candleChart, lightweightChart } from './utils/chart.ts';
import { $ } from './utils/document-query.util.ts';

$<HTMLDivElement>('#app')!.innerHTML = /* html */ `
    <h1>Farm</h1>

    <section style="display: inline-flex; flex-flow: row wrap; gap: 1rem;">
  
      <div id="barChart"></div>
      <div id="lineChart"></div>
      <div id="areaChart"></div>
      <div id="baselineChart"></div>
      <div id="candleChart"></div>
      <div id="histogramChart"></div>
      <section>

    ${ParrafoAnimado()}
  </div>
`;

// lightweightChart('Bar', $('#barChart')!);
lightweightChart('Line', $('#lineChart')!);
lightweightChart('Area', $('#areaChart')!);
lightweightChart('Baseline', $('#baselineChart')!);
candleChart($('#candleChart')!);
lightweightChart('Histogram', $('#histogramChart')!);
