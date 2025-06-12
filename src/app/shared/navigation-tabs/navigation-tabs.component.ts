import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navigation-tabs',
  standalone: false,
  templateUrl: './navigation-tabs.component.html',
  styleUrl: './navigation-tabs.component.scss'
})
export class NavigationTabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab: string = '';
  @Output() tabChange = new EventEmitter<string>();

  onTabClick(tabId: string): void {
    this.tabChange.emit(tabId);
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab === tabId;
  }

  getTabClasses(tabId: string): string {
    if (this.isActiveTab(tabId)) {
      return 'border-blue-500 text-white';
    }
    return 'border-transparent text-gray-300 hover:text-white hover:border-gray-300';
  }
} 