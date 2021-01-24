import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ListImageModel } from "../models/list-image.model";
import { UploadImageService } from "../service/upload.service";

@Component({
  selector: "app-list-image-tab",
  templateUrl: "./list-image-tab.component.html",
  styleUrls: ["./list-image-tab.component.scss"],
})
export class ListImageTabComponent implements OnInit {
  public listImage: ListImageModel[] = [];
  constructor(private uploadImageService: UploadImageService, private modalService: NgbActiveModal) {
    this.listImage = [
      {
        filePath:
          "https://pix10.agoda.net/hotelImages/734748/-1/a69e228488fd1b672b2e16343413dff4.jpg?s=1200x800",
      },
      {
        filePath:
          "https://pix10.agoda.net/hotelImages/734748/-1/a69e228488fd1b672b2e16343413dff4.jpg?s=1200x800",
      },
      {
        filePath:
          "https://pix10.agoda.net/hotelImages/734748/-1/a69e228488fd1b672b2e16343413dff4.jpg?s=1200x800",
      },
      {
        filePath:
          "https://pix10.agoda.net/hotelImages/734748/-1/a69e228488fd1b672b2e16343413dff4.jpg?s=1200x800",
      },
      {
        filePath:
          "https://pix10.agoda.net/hotelImages/734748/-1/a69e228488fd1b672b2e16343413dff4.jpg?s=1200x800",
      },
      {
        filePath:
          "https://pix10.agoda.net/hotelImages/734748/-1/a69e228488fd1b672b2e16343413dff4.jpg?s=1200x800",
      },
      {
        filePath:
          "https://pix10.agoda.net/hotelImages/734748/-1/a69e228488fd1b672b2e16343413dff4.jpg?s=1200x800",
      },
      {
        filePath:
          "https://pix10.agoda.net/hotelImages/734748/-1/a69e228488fd1b672b2e16343413dff4.jpg?s=1200x800",
      },
      {
        filePath:
          "https://pix10.agoda.net/hotelImages/734748/-1/a69e228488fd1b672b2e16343413dff4.jpg?s=1200x800",
      },
      {
        filePath:
          "https://pix10.agoda.net/hotelImages/734748/-1/a69e228488fd1b672b2e16343413dff4.jpg?s=1200x800",
      },
    ];
  }
  ngOnInit(): void {
    this.uploadImageService.get_DanhSach().subscribe((res) => {
      console.log(res);
    });
  }
  public onSelectImage(image){
    this.modalService.close(image);
  }
}
