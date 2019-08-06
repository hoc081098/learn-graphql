import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatMenuModule,
  MatDialogModule,
  MatDividerModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatDividerModule,
  ]
})
export class SharedModule {}
