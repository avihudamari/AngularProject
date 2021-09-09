import { Component } from "@angular/core";

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html'
})
export class ServerComponent { 
    serverId = 13;
    serverStatus = 'online';
}