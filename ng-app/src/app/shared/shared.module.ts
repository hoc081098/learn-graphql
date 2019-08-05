import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule]
})
export class SharedModule {}
