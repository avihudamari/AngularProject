import { Component } from "@angular/core";

@Component({
    templateUrl: './snackbar.component.html',
    selector: 'app-snackbar',
    styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
    message: string;
    fire(message: string, status: string) {
        this.message = message;
        let snackbar = document.getElementById("snackbar");
        snackbar.className = "show";
        if (status && status === 'danger') {
            snackbar.style.backgroundColor = '#ff3333';
        }
        setTimeout(() => {
            snackbar.className = snackbar.className.replace("show", "")
        }, 3000);
    }
}