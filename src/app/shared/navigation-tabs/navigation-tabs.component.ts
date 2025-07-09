import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  isDropdown?: boolean;
  dropdownOptions?: DropdownOption[];
}

export interface DropdownOption {
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

  public openDropdownId: string | null = null;
  public dropdownPosition: { top: number; left: number } | null = null;

  onTabClick(tabId: string, buttonElement?: HTMLElement): void {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab?.isDropdown) {
      if (this.openDropdownId === tabId) {
        // Close dropdown
        this.openDropdownId = null;
        this.dropdownPosition = null;
      } else {
        // Open dropdown and calculate position
        this.openDropdownId = tabId;
        this.calculateDropdownPosition(buttonElement);
      }
    } else {
      this.openDropdownId = null;
      this.dropdownPosition = null;
      this.tabChange.emit(tabId);
    }
  }

  private calculateDropdownPosition(buttonElement?: HTMLElement): void {
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      this.dropdownPosition = {
        top: rect.bottom + 4, // 4px gap
        left: rect.left
      };
    }
  }

  onDropdownOptionClick(optionId: string): void {
    this.openDropdownId = null;
    this.dropdownPosition = null;
    this.tabChange.emit(optionId);
  }

  getActiveDropdownOptions(): DropdownOption[] {
    if (!this.openDropdownId) return [];
    const tab = this.tabs.find(t => t.id === this.openDropdownId);
    return tab?.dropdownOptions || [];
  }

  isDropdownOpen(tabId: string): boolean {
    return this.openDropdownId === tabId;
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab === tabId;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Check if click is outside dropdown and buttons
    if (!target.closest('button') && !target.closest('.fixed')) {
      this.openDropdownId = null;
      this.dropdownPosition = null;
    }
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onWindowEvent(): void {
    if (this.openDropdownId) {
      // Close dropdown on scroll/resize to avoid positioning issues
      this.openDropdownId = null;
      this.dropdownPosition = null;
    }
  }

  getTabClasses(tabId: string): string {
    const tab = this.tabs.find(t => t.id === tabId);
    const isDropdownParent = tab?.isDropdown && tab.dropdownOptions?.some(opt => opt.id === this.activeTab);
    
    if (this.isActiveTab(tabId) || isDropdownParent) {
      return 'border-blue-500 text-blue-600 bg-white shadow-sm';
    }
    return 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-400';
  }
} 