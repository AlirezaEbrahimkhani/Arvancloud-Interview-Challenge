import { Component } from "@angular/core";
import { LoadingBarService } from "../../shared";

@Component({
  selector: "app-loading-bar",
  templateUrl: "./loading-bar.component.html",
  styleUrls: ["./loading-bar.component.scss"]
})
export class LoadingBarComponent {
  constructor(public loadingBarService: LoadingBarService) {}
}
