import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { MatNativeDateModule } from '@angular/material/core';

// Highlight JS
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import highlight from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { SplashScreenModule } from './_metronic/partials/layout/splash-screen/splash-screen.module';
import { AuthGuard } from './modules/auth/_services/auth.guard';
import { AuthInterceptor } from './modules/shares/interceptors/auth.interceptor';
import { AuthService } from './modules/auth';
import { TemplateModule } from './modules/shares/template/template.module';
import { UploadFileModule } from './modules/shares/upload-file/upload-file.module';
import { CKEditorModule } from 'ckeditor4-angular';
import { PipeModule } from './modules/shares/pipe/pipe.module';

function appInitializer(authService: AuthService) {
  return () => {
   authService.GetUser();
  };
}

/**
 * Import specific languages to avoid importing everything
 * The following will lazy load highlight.js core script (~9.6KB) + the selected languages bundle (each lang. ~1kb)
 */
export function getHighlightLanguages() {
  return [
    { name: 'typescript', func: typescript },
    { name: 'scss', func: scss },
    { name: 'xml', func: xml },
    { name: 'json', func: json },
  ];
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    SplashScreenModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    HighlightModule,
    ClipboardModule,
    TemplateModule,
    UploadFileModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    CKEditorModule,
    PipeModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
