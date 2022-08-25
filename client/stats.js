import * as echarts from 'echarts';

const myChart = echarts.init(document.querySelector('#chart'));
const data = getData()
const socket = window.socket

socket.on("set-stats", (args) => {  
  const { option } = args

  const newData = window.getData().map((item) => {
    return item.type == option ? { ...item, value: item.value + 1 } : { ...item }
  })
  
  window.setData("ninit", newData)

  myChart.setOption({
    title: {
      text: 'ECharts Getting Started Example'
    },
    tooltip: {},
    xAxis: {
      data: newData.map(item => item.type)
    },
    yAxis: {},
    series: [
      {
        name: 'sales',
        type: 'bar',
        data: newData.map(item => item.value)
      }
    ]
  });
})


myChart.setOption({
  title: {
    text: 'ECharts Getting Started Example'
  },
  tooltip: {},
  xAxis: {
    data: data.map(item => item.type)
  },
  yAxis: {},
  series: [
    {
      name: 'sales',
      type: 'bar',
      data: data.map(item => item.value)
    }
  ]
});