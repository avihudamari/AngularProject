import { Component, ViewChild } from "@angular/core";

@Component({
    templateUrl: './snackbar.component.html',
    selector: 'app-snackbar',
    styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
    @ViewChild('snackbar') snackbar;
    message: string;

    fire(message: string, status: string) {
        this.message = message;
        // let snackbar = document.getElementById("snackbar");
        this.snackbar.className = "show";
        if (status && status === 'danger') {
            this.snackbar.style.backgroundColor = '#ff3333';
        }
        setTimeout(() => {
            this.snackbar.className = this.snackbar.className.replace("show", "")
        }, 3000);
    }
}