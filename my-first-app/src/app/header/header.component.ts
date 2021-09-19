import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() selected = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect (selectedItem) {
    this.selected.emit(selectedItem);
  }

}
