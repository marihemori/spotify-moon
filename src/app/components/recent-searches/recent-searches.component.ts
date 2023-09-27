import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss'],
})
export class RecentSearchesComponent implements OnInit {
  recentSearches = ['Muse', 'Ghost', 'Tanz Mit Mir', 'Siouxsie', 'A Forest'];
  searchInput = '';
  constructor() {}

  ngOnInit(): void {}

  setSearch(search: string) {
    this.searchInput = search;
  }

  search() {
    console.log('Searching...', this.searchInput);
  }
}
