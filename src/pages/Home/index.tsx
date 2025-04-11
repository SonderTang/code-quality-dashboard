// src/pages/Home/index.tsx
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import styles from "./style.module.scss";

const Home: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current, 'dark'); // 使用暗黑主题

      const option = {
        title: {
          text: '前端质量指南',
          left: 'center',
          top: '10%',
          textStyle: {
            color: '#fff',
            fontSize: 36,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        grid: {
          top: '20%'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // x 轴的数据
          axisLine: {
            lineStyle: {
              color: '#fff', // 坐标轴线颜色
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff', // 坐标轴线颜色
            },
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              color: function (params) {
                // 自定义颜色
                const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae'];
                return colorList[params.dataIndex];
              }
            }
          },
          {
            name: '销量',
            type: 'line',
            data: [120, 200, 150, 80, 70, 110, 130],
            smooth: true,
            itemStyle: {
              color: '#61a0a8'
            }
          },
          {
            name: '库存',
            type: 'bar',
            data: [50, 70, 90, 110, 130, 150, 170],
            itemStyle: {
              color: '#d48265'
            }
          }
        ]
      };

      chartInstance.setOption(option);
      window.addEventListener("resize", chartInstance.resize);
      return () => {
        window.removeEventListener("resize", chartInstance.resize);
      };
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.chart} ref={chartRef}></div>
    </div>
  );
};

export default Home;