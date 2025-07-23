import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart, ChartConfiguration, ChartEvent, ChartType, registerables } from 'chart.js';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-market-graphs-card',
  standalone: false,
  templateUrl: './market-graphs-card.html',
  styleUrl: './market-graphs-card.scss'
})
export class MarketGraphsCard implements OnInit, AfterViewInit, OnDestroy {
  public activeChart: 'sharePrice' | 'marketCap' = 'sharePrice';
  public shareChart: Chart | null = null;
  public marketCapChart: Chart | null = null;
  public companyData: any = null;
  private subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.apiService.companyInfo$.subscribe(data => {
        console.log('Market Graphs Card - Received data:', data);
        this.companyData = data;
        if (data && this.shareChart && this.marketCapChart) {
          this.updateChartsWithData();
        }
      })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeCharts();
      if (this.companyData) {
        this.updateChartsWithData();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.shareChart) {
      this.shareChart.destroy();
    }
    if (this.marketCapChart) {
      this.marketCapChart.destroy();
    }
  }

  switchChart(chartType: 'sharePrice' | 'marketCap'): void {
    this.activeChart = chartType;
  }

  private initializeCharts(): void {
    this.createSharePriceChart();
    this.createMarketCapChart();
  }

  private updateChartsWithData(): void {
    if (!this.companyData?.values) return;

    // Update Share Price Chart
    if (this.shareChart && this.companyData.values.yearlySharePrice) {
      this.updateSharePriceChart();
    }

    // Update Market Cap Chart (using market price data)
    if (this.marketCapChart && this.companyData.values.yearlyMarketPrice) {
      this.updateMarketCapChart();
    }
  }

  private updateSharePriceChart(): void {
    const yearlyTurnover = this.companyData.values.yearlySharePrice.yearlyTurnover;
    const years = Object.keys(yearlyTurnover).sort();
    const values = years.map(year => parseFloat((yearlyTurnover[year] / 1000000000).toFixed(2))); // Convert to billions

    if (this.shareChart) {
      this.shareChart.data.labels = years;
      this.shareChart.data.datasets[0] = {
        label: 'Yearly Turnover (Billions USD)',
        data: values,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      };
      // Remove second dataset for cleaner look with real data
      this.shareChart.data.datasets = [this.shareChart.data.datasets[0]];
      this.shareChart.update();
    }
  }

  private updateMarketCapChart(): void {
    const yearlyMarketPrice = this.companyData.values.yearlyMarketPrice;
    
    // Get the most recent year's monthly data
    const years = Object.keys(yearlyMarketPrice.close).sort();
    const latestYear = years[years.length - 1];
    
    if (!yearlyMarketPrice.close[latestYear]) return;

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthLabels = months.map(month => month.charAt(0) + month.slice(1).toLowerCase());
    
    const closeData = months.map(month => {
      const value = yearlyMarketPrice.close[latestYear][month];
      return value ? parseFloat(value.toFixed(2)) : null;
    }).filter(value => value !== null);

    const highData = months.map(month => {
      const value = yearlyMarketPrice.high[latestYear][month];
      return value ? parseFloat(value.toFixed(2)) : null;
    }).filter(value => value !== null);

    const lowData = months.map(month => {
      const value = yearlyMarketPrice.low[latestYear][month];
      return value ? parseFloat(value.toFixed(2)) : null;
    }).filter(value => value !== null);

    if (this.marketCapChart) {
      this.marketCapChart.data.labels = monthLabels.slice(0, closeData.length);
      this.marketCapChart.data.datasets = [
        {
          label: `Close Price ${latestYear} (USD)`,
          data: closeData,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        },
        {
          label: `High Price ${latestYear} (USD)`,
          data: highData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4
        },
        {
          label: `Low Price ${latestYear} (USD)`,
          data: lowData,
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4
        }
      ];
      this.marketCapChart.update();
    }
  }

  private createSharePriceChart(): void {
    const canvas = document.getElementById('sharePriceChart') as HTMLCanvasElement;
    if (canvas) {
      this.shareChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: ['Loading...'],
          datasets: [{
            label: 'Loading data...',
            data: [0],
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
                text: 'Billions USD'
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
          labels: ['Loading...'],
          datasets: [{
            label: 'Loading data...',
            data: [0],
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
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
}
