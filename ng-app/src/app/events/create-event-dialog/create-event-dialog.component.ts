import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatFormFieldControl,
  MatSnackBar
} from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateEvent } from 'src/app/generated/graphql';
import { EventsService } from '../events.service';
import { getErrorMessage } from 'src/app/util/message.util';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.css']
})
export class CreateEventDialogComponent implements OnInit {
  formGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    private readonly eventsService: EventsService,
    private readonly snackbar: MatSnackBar
  ) { }

  ngOnInit() { }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }
    const event = {
      ...this.formGroup.value,
      date: new Date(this.formGroup.value.date).toISOString()
    } as CreateEvent.Variables;
    console.log({ event });

    this.eventsService
      .createEvent(event)
      .subscribe(
        _ => {
          this.dialogRef.close();
          this.snackbar.open('Created event successfully', undefined, { duration: 2000 });
        },
        error => {
          this.dialogRef.close();
          this.snackbar.open(getErrorMessage(error), undefined, { duration: 2000 });
        }
      );
  }

  getTitleError(): string {
    if (this.formGroup.controls.title.hasError('required')) {
      return 'Required title';
    }
    if (this.formGroup.controls.title.hasError('minlength')) {
      return 'Too short title';
    }
    return '';
  }

  getPriceError(): string {
    if (this.formGroup.controls.price.hasError('required')) {
      return 'Required price';
    }
    if (this.formGroup.controls.price.hasError('min')) {
      return 'Min price is $1';
    }
    return '';
  }

  getDateError(): string {
    if (this.formGroup.controls.date.hasError('required')) {
      return 'Required date';
    }
    return '';
  }

  getDescriptionError(): string {
    if (this.formGroup.controls.description.hasError('required')) {
      return 'Required description';
    }
    if (this.formGroup.controls.description.hasError('minlength')) {
      return 'Too short description';
    }
    return '';
  }
}
