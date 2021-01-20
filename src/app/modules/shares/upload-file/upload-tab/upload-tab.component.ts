import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UploadImageService } from "../service/upload.service";

@Component({
  selector: "app-upload-tab",
  templateUrl: "./upload-tab.component.html",
  styleUrls: ["./upload-tab.component.scss"],
})
export class UploadTabComponent implements OnInit {
  fileToUpload: File = null;
  constructor(private uploadService : UploadImageService){

  }
  ngOnInit(): void {}
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadService.postFile(this.fileToUpload).subscribe(res => {
      console.log("abc abc abc",  res)
    });
  }
  
}
