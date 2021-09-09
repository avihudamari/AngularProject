import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowAddServer = false;
  addServerStatus = 'server was not created';
  serverName = '';

  constructor() { 
    setTimeout( ()=> {
      this.allowAddServer = true;
    },2000);
  }

  ngOnInit(): void {
  }
  onClickAddServer () {
    this.addServerStatus = 'server created. server name is: ' + this.serverName;
  }

  onChangeServerName (e) {
    this.serverName = e.target.value;
  }
}
