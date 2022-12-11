import palette from 'google-palette';
import { Result } from "../interfaces/Poll";

export function formData(results:Result|any) {
    if (!results) return;
    const pollChartData: any[] = [];
    for (let key in results) {
      let chartData:any = {
        data: {
          labels: [],
          datasets: [{data:[]}]
        },
        title: results[key].question,
        questionId: key
      }
      results[key].details.forEach((detail:any) => {
        chartData.data.labels?.push(detail.answer);
        chartData.data.datasets[0].data.push(detail.result);
      });
      chartData.data.datasets[0].backgroundColor = 
        palette("cb-Accent", results[key].details.length).map((color:any) => "#" + color)
      pollChartData.push(chartData)      
    }
    return pollChartData;
  }

  const datalabels = {
    color: "#fff",
    font: {
      size: 16
    },
    formatter: (value: number, context: any) => {
      const data = context.chart.data;
      const total = context.dataset.data.reduce((i:number, acc:number) => i + acc, 0);
      return Math.round((100/total) * value) + "%";
    }
  }

  export const pieOptions = {
    plugins: {
      datalabels    
    }
  }

  export const barOptions = {
    scales: {
      y: {
        ticks: {
          precision: 0
        }
      }
    },
    plugins: {
      datalabels,
      legend: {
        display: false
      }
    },
  }

  