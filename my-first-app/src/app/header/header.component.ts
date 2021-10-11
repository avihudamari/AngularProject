import { Component, OnInit } from '@angular/core';
import { dataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dss: dataStorageService) {
  }

  ngOnInit(): void {
  }

  onStoredRecipes() {
    this.dss.storeRecipes();
  }

  onFetchedRecipes() {
    this.dss.fetchRecipes();
  }

}
