import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss'],
})
export class GraphicsComponent implements OnInit, OnDestroy {
  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [0, 0, 0, 0],
        label: 'Ventas',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April'],
  };
  private dataSubscription: Subscription;
  private changesSubscription: Subscription;

  constructor(private http: HttpClient, private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.getData();
    this.listenSocket();
  }

  /**
   * Método para obtener los primeros datos de nuestro socket.
   */

  getData(): void {
    this.dataSubscription = this.http
      .get<ChartConfiguration['data']>(`${environment.wsUrl}/grafica`)
      .subscribe((data) => (this.lineChartData = data));
  }

  /**
   * Método para esuchar los cambios en nuestro socket y actualizar la vista.
   */

  listenSocket(): void {
    this.changesSubscription = this.wsService
      .listen('graphic-change')
      .subscribe((data) => (this.lineChartData = data));
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.changesSubscription.unsubscribe();
  }
}
