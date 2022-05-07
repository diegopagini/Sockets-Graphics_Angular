import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicsComponent } from './graphics/graphics.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [GraphicsComponent],
  imports: [CommonModule, NgChartsModule],
  exports: [GraphicsComponent],
})
export class ComponentsModule {}
