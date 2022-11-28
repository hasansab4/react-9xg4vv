import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highcharts3d from 'highcharts/highcharts-3d';

highcharts3d(Highcharts);
const chartOptions = {
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
    },
  },
  title: {
    text: '3D Chart',
  },
  yAxis: [
    {
      labels: {
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
      title: {
        text: 'Primary',
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
    },
    {
      // Secondary yAxis
      title: {
        text: 'Secondary',
        style: {
          color: Highcharts.getOptions().colors[1],
        },
      },
      labels: {
        style: {
          color: Highcharts.getOptions().colors[1],
        },
      },
      opposite: true,
    },
  ],
  series: [
    {
      name: 'Primary',
      type: 'area',
      data: [
        49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        95.6, 54.4,
      ],
    },
    {
      name: 'Secondary',
      type: 'spline',
      data: [
        7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
      ],
      yAxis: 1,
    },
  ],
  plotOptions: {
    series: {
      point: {},
    },
  },
};

const App = () => {
  function addEvents(H, chart) {
    function dragStart(eStart) {
      eStart = chart.pointer.normalize(eStart);

      let posX = eStart.chartX,
        posY = eStart.chartY,
        alpha = chart.options.chart.options3d.alpha,
        beta = chart.options.chart.options3d.beta,
        sensitivity = 5,
        handlers = [];

      function drag(event) {
        // Get e.chartX and e.chartY

        event = chart.pointer.normalize(event);

        chart.update(
          {
            chart: {
              options3d: {
                alpha: alpha + (event.chartY - posY) / sensitivity,
                beta: beta + (posX - event.chartX) / sensitivity,
                depth: 200,
              },
            },
          },
          undefined,
          undefined,
          false
        );
      }

      function unbindAll() {
        handlers.forEach(function (unbind) {
          if (unbind) {
            unbind();
          }
        });
        handlers.length = 0;
      }

      handlers.push(H.addEvent(document, 'mousemove', drag));
      handlers.push(H.addEvent(document, 'touchmove', drag));

      handlers.push(H.addEvent(document, 'mouseup', unbindAll));
      handlers.push(H.addEvent(document, 'touchend', unbindAll));
    }
    H.addEvent(chart.container, 'mousedown', dragStart);
    H.addEvent(chart.container, 'touchstart', dragStart);
  }
  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        containerProps={{ style: { width: '100%', height: '100%' } }}
        callback={function (chart) {
          addEvents(Highcharts, chart);
        }}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
