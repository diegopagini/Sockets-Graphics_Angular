import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const config: SocketIoConfig = {
  url: environment.wsUrl,
};
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SocketIoModule.forRoot(config)],
  bootstrap: [AppComponent],
})
export class AppModule {}
