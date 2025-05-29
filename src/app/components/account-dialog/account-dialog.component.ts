import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { Account } from '../../models/account.model';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class AccountDialogComponent {
  form: FormGroup;
  dialogTitle: string;

  // Dependency injection
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AccountDialogComponent>);
  protected data = inject<Account>(MAT_DIALOG_DATA);

  constructor() {
    this.dialogTitle = this.data?._id ? 'Edit Account' : 'New Account';
    this.form = this.fb.group({
      name: [this.data?.name || '', [Validators.required]],
      username: [this.data?.username || '', [Validators.required]],
      password: [this.data?.password || '', [Validators.required]],
      description: [this.data?.description || '', [Validators.required]],
      url: [this.data?.url || '', [Validators.required, Validators.pattern('https?://.+')]],
      status: [this.data?.status || ['active'], [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const result = {
        ...this.data,
        ...this.form.value
      };
      this.dialogRef.close(result);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 