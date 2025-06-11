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
    this.updateChartVisibility();
  }

  private initializeCharts(): void {
    this.createSharePriceChart();
    this.createMarketCapChart();
    this.updateChartVisibility();
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
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
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
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            label: 'Market Cap (Billions)',
            data: [2.1, 2.4, 2.8, 3.2],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(168, 85, 247, 0.8)',
              'rgba(249, 115, 22, 0.8)'
            ],
            borderColor: [
              'rgba(34, 197, 94, 1)',
              'rgba(59, 130, 246, 1)',
              'rgba(168, 85, 247, 1)',
              'rgba(249, 115, 22, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
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

  private updateChartVisibility(): void {
    const shareChartCanvas = document.getElementById('sharePriceChart') as HTMLCanvasElement;
    const marketCapChartCanvas = document.getElementById('marketCapChart') as HTMLCanvasElement;
    
    if (shareChartCanvas && marketCapChartCanvas) {
      if (this.activeChart === 'sharePrice') {
        shareChartCanvas.style.display = 'block';
        marketCapChartCanvas.style.display = 'none';
      } else {
        shareChartCanvas.style.display = 'none';
        marketCapChartCanvas.style.display = 'block';
      }
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
