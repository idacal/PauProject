import { Component } from '@angular/core';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  selected: boolean;
}

@Component({
  selector: 'app-latest-news-card',
  standalone: false,
  templateUrl: './latest-news-card.html',
  styleUrl: './latest-news-card.scss'
})
export class LatestNewsCard {

  public newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Y-mabs Therapeutics, Inc. closes $143.8 million common stock offering.',
      date: 'November 24, 2020',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      selected: false
    },
    {
      id: 2,
      title: 'Y-mabs Therapeutics, Inc. prices $125 million common stock offering.',
      date: 'October 30, 2019',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      selected: false
    },
    {
      id: 3,
      title: 'Y-mabs Therapeutics announces strategic partnership with leading biotech company.',
      date: 'September 15, 2019',
      content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
      selected: false
    },
    {
      id: 4,
      title: 'Y-mabs Therapeutics receives FDA breakthrough therapy designation.',
      date: 'August 12, 2019',
      content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.',
      selected: false
    },
    {
      id: 5,
      title: 'Y-mabs Therapeutics announces Q3 2019 financial results and business updates.',
      date: 'July 8, 2019',
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      selected: false
    }
  ];

  public searchQuery: string = '';

  updateSearchQuery(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
  }

  toggleNewsSelection(newsId: number) {
    const news = this.newsItems.find(item => item.id === newsId);
    if (news) {
      news.selected = !news.selected;
    }
  }

  getSelectedNews(): NewsItem[] {
    return this.newsItems.filter(item => item.selected);
  }

  saveSelectedNews() {
    const selectedNews = this.getSelectedNews();
    if (selectedNews.length === 0) {
      alert('Please select at least one news item to save.');
      return;
    }
    
    console.log('Saving selected news:', selectedNews);
    alert(`Saved ${selectedNews.length} news item(s) successfully!`);
    
    // Reset selections after saving
    this.newsItems.forEach(item => item.selected = false);
  }

  get hasSelectedNews(): boolean {
    return this.newsItems.some(item => item.selected);
  }

}
