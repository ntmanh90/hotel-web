import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateDataPipe } from './date/date-pipe.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        DateDataPipe
    ],
    declarations: [DateDataPipe]
})
export class PipeModule {
}
