import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-market-graphs-card',
  standalone: false,
  templateUrl: './market-graphs-card.html',
  styleUrl: './market-graphs-card.scss'
})
export class MarketGraphsCard implements OnInit, AfterViewInit {
  public activeChart: 'sharePrice' | 'marketCap' = 'sharePrice';
  public shareChart: Chart | null = null;
  public marketCapChart: Chart | null = null;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }

  switchChart(chartType: 'sharePrice' | 'marketCap'): void {
    this.activeChart = chartType;
  }

  private initializeCharts(): void {
    this.createSharePriceChart();
    this.createMarketCapChart();
  }

  private createSharePriceChart(): void {
    const canvas = document.getElementById('sharePriceChart') as HTMLCanvasElement;
    if (canvas) {
      this.shareChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Share Price ($)',
            data: [45.2, 48.7, 52.1, 49.8, 53.4, 57.2, 54.9, 58.1, 61.3, 59.7, 63.2, 65.8],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }, {
            label: 'Target Price ($)',
            data: [42.0, 46.5, 50.8, 47.2, 51.1, 55.8, 52.3, 56.7, 59.8, 57.4, 61.5, 63.2],
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              title: {
                display: true,
                text: 'USD'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  }

  private createMarketCapChart(): void {
    const canvas = document.getElementById('marketCapChart') as HTMLCanvasElement;
    if (canvas) {
      this.marketCapChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Market Cap (Billions)',
            data: [2.8, 3.1, 2.9, 3.4, 3.7, 3.2, 3.9, 4.1, 3.8, 4.3, 4.6, 4.2],
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }, {
            label: 'Industry Average (Billions)',
            data: [2.5, 2.8, 2.6, 3.1, 3.4, 2.9, 3.6, 3.8, 3.5, 4.0, 4.3, 3.9],
            borderColor: 'rgb(168, 85, 247)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            borderWidth: 2,
            fill: false,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              title: {
                display: true,
                text: 'USD'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  }



  ngOnDestroy(): void {
    if (this.shareChart) {
      this.shareChart.destroy();
    }
    if (this.marketCapChart) {
      this.marketCapChart.destroy();
    }
  }
}
