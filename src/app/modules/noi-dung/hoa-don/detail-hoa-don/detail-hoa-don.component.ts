import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateUpdateHoaDonModel } from "../../_models/create-update-hoa-don.model";
import { HoaDonService } from "../../_services/hoa-don.service";

@Component({
  selector: "app-detail-hoa-don",
  templateUrl: "./detail-hoa-don.component.html",
  styleUrls: ["./detail-hoa-don.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailHoaDonComponent implements OnInit {
  public titleHoaDon: string;
  public _detailHoaDon: CreateUpdateHoaDonModel;
  constructor(
    private routeActive: ActivatedRoute,
    private route: Router,
    private hoaDonService: HoaDonService,
    private cd: ChangeDetectorRef
  ) {
    this.routeActive.params.subscribe((res) => {
      if (res.id) {
        this.loadDetailHoaDon(res.id);
      } else {
        this.route.navigateByUrl("/noi-dung/hoadon");
      }
    });
  }

  ngOnInit() {}

  private loadDetailHoaDon = (id) => {
    this.hoaDonService.get_ChiTiet_HoaDon(id).subscribe((res) => {
      this.titleHoaDon = "Thông tin mã hóa đơn " + res.maHoaDon;
      this._detailHoaDon = res;
      this.cd.markForCheck();
    });
  }
  public backToHoaDonList(event){
    this.route.navigateByUrl('/noi-dung/hoadon');
  }
}
