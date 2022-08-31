import * as echarts from 'echarts';

const myChart = echarts.init(document.querySelector('#chart'));
const data = getData()
const socket = window.socket
const bgBarColor = ["#edb721", "#9ce329", "#2569cf", "#9b2bbd"]

socket.on("set-stats", (args) => {  
  const { option } = args

  const newData = window.getData().map((item) => {
    return item.type == option ? { ...item, value: item.value + 1 } : { ...item }
  })
  
  window.setData("ninit", newData)

  myChart.setOption({
    title: {
      text: 'Stats Polling Console'
    },
    tooltip: {},
    xAxis: {
      data: newData.map(item => item.type)
    },
    yAxis: {},
    series: [
      {
        name: 'Total',
        type: 'bar',
        data: newData.map((item, key) => ({value: item.value, itemStyle: { color: bgBarColor[key] } }))
      }
    ]
  });
})


myChart.setOption({
  title: {
    text: 'Stats Polling Console'
  },
  tooltip: {},
  xAxis: {
    data: data.map(item => item.type)
  },
  yAxis: {},
  series: [
    {
      name: 'Total',
      type: 'bar',
      data: data.map((item, key) => ({value: item.value, itemStyle: { color: bgBarColor[key] } }))
    }
  ]
});