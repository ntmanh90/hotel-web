import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.scss'],
})
export class AvatarUploadFileComponent implements OnInit {
    ngOnInit(): void {
    }
    public titleDialog = "Chọn ảnh Avatar"
}