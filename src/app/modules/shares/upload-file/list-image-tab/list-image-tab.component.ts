import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UploadImageService } from "../service/upload.service";

@Component({
  selector: "app-list-image-tab",
  templateUrl: "./list-image-tab.component.html",
  styleUrls: ["./list-image-tab.component.scss"],
})
export class ListImageTabComponent implements OnInit {
  constructor(private uploadImageService: UploadImageService) {}
  ngOnInit(): void {
    this.uploadImageService.get_DanhSach().subscribe((res) => {
      console.log(res);
    });
  }
}
