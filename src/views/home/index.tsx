import React, { MutableRefObject, useEffect, useRef } from 'react'
import * as echarts from 'echarts'
const Home: React.FC = () => {
  const bar: MutableRefObject<any> = useRef(null)
  const initEchart = () => {
    var myChart = echarts.init(bar.current)
    var xAxisData = []
    var data = []
    for (var i = 0; i < 50; i++) {
      xAxisData.push(i)
      data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
    }
    var option = {
      backgroundColor: '#08263a',
      xAxis: {
        show: false,
        data: xAxisData,
      },
      visualMap: {
        show: false,
        min: 0,
        max: 50,
        dimension: 0,
        inRange: {
          color: [
            '#4a657a',
            '#308e92',
            '#b1cfa5',
            '#f5d69f',
            '#f5898b',
            '#ef5055',
          ],
        },
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#4a657a',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#08263f',
          },
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          type: 'bar',
          data: data,
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              shadowBlur: 10,
              shadowColor: '#111',
            },
          },
          animationEasing: 'elasticOut',
          animationEasingUpdate: 'elasticOut',
          animationDelay: function (idx: any) {
            return idx * 20
          },
          animationDelayUpdate: function (idx: any) {
            return idx * 20
          },
        },
      ],
    }
    myChart.setOption(option)
  }
  useEffect(() => {
    initEchart()
  })
  return (
    <div style={{ backgroundColor: '#08263a', height: '100%' }}>
      <div ref={bar} style={{ width: '88vw', height: '100%' }}></div>
    </div>
  )
}

export default Home
