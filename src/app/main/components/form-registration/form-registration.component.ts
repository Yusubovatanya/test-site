import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { UserCoreService } from 'src/app/core/services/user-core/user-core.service';
import { Position } from 'src/app/core/models/position.model';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { SnackService } from '../../../shared/services/snack.service';
import { PagingService } from 'src/app/shared/services/paging.service';
import { MsgError } from 'src/app/core/models/error-msg.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.component.html',
  styleUrls: ['./form-registration.component.scss']
})
export class FormRegistrationComponent implements OnInit {
  registerForm: FormGroup;
  positions: Position[];
  togglePositionStatus = false;
  togglePositionSelected: Position;
  file = undefined;

  @ViewChild('importSelector', { static: false, read: ElementRef })
  importSelectorRef: ElementRef;
  validatorsValues = ['position_id', 'name', 'email', 'phone', 'photo']

  formErrors = {
    'userName': '',
    'userEmail': '',
    'userPhone': '',
    'position': '',
    'photo': '',
  };

  validationMessages = {
    'userName': {
      'required': 'Name is required',
      'min': 'Min length 2',
      'max': 'Max length 60',
    },
    'userEmail': {
      'required': 'Email is required',
      'email': 'Value has to be a valid email address.',
    },
    'userPhone': {
      'required': 'Phone  is required',
      'phoneNumberValidator': ' Value has to be a number.',
    },
    'position': {
      'required': 'Select position',
    },
    'photo': {
      'required': 'Select photo',
      'photoValidator': 'File format jpg up to 5 MB, the minimum size of 70x70px',
    }
  };
  fileSize = { height: 0, width: 0, size: 0 };
  isValidFile: boolean;

  constructor(
    private formBuild: FormBuilder,
    public userCoreService: UserCoreService,
    public userService: UserService,
    public dialog: MatDialog,
    public pagingService: PagingService,
    public snackService: SnackService,
  ) { }

  ngOnInit() {
    this.positions = this.userCoreService.positions;
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuild.group({
      userName: ['', [Validators.required, Validators.min(2), Validators.max(60)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPhone: ['', [Validators.required, Validators.pattern(/^[\+]{0,1}380([0-9]{9})$/)]],
      position: ['', [Validators.required]],
      photo: ['', [Validators.required]],
    });
    // this.registerForm.valueChanges.subscribe(() => {
    //   console.log(this.registerForm)
    //   if (this.registerForm.touched) {
    //     this.onValueChange();
    //   }
    // });
  }

  onValueChange() {
    for (let element in this.formErrors) {
      this.formErrors[element] = "";
      let controlElement = this.registerForm.get(element);
      if (controlElement && controlElement.touched && !controlElement.valid) {
        let message = this.validationMessages[element];
        for (let key in controlElement.errors) {
          this.formErrors[element] += message[key] + " ";
        }
      }
    }
  }

  isFieldValid(field: string) {
    let isError = !this.registerForm.get(field).valid && this.registerForm.get(field).touched;
    if (isError) {
     console.log(this.registerForm.get(field).errors);
      // this.onValueChange()
    }
    return isError;
  }

  selectPositionFromList(position) {
    this.togglePositionSelected = position;
    this.positions.forEach(item => {
      if (item === position) {
        this.registerForm.patchValue({
          ['position']: position,
        });
        item.isActiveOption = true;
      } else {
        item.isActiveOption = false;
      }
    })
    this.togglePositionStatus = false;
  }

  togglePosition() {
    this.togglePositionStatus = !this.togglePositionStatus;
  }

  create() {
    if (this.registerForm.valid && this.isValidFile) {
      let formData = new FormData();
      formData.append('position_id', this.registerForm.value.position.id);
      formData.append('name', this.registerForm.value.userName);
      formData.append('email', this.registerForm.value.userEmail);
      formData.append('phone', this.registerForm.value.userPhone);
      formData.append('photo', this.file);

      this.userCoreService.getToken().
        pipe(
          switchMap(() => {
            return this.userCoreService.registrationUser(formData);
          })
        )
        .subscribe(
          (res: any) => {
            if (res.success) {
              const dialogRef = this.dialog.open(DialogComponent, {
                width: '290px',
                data: 'success',
              });
              dialogRef.afterClosed().subscribe(() => {
                this.userService.registryUser();
                this.resetForm();
              })
            } else {
              this.snackService.openSnack('danger', { status: 'Error!', msg: '', fails: '' });
            };
          },
          (err: MsgError) => {
          });
    }
  }
  resetForm() {
    this.registerForm.reset();
    this.file = undefined;
  }

  photoValidator() {
    if (this.fileSize.size < 5 && this.fileSize.height >= 70 && this.fileSize.width >= 70) {
      this.isValidFile = true;
    } else {
      this.formErrors.photo = this.validationMessages.photo.photoValidator;
      this.isValidFile = false;
    }
  }

  getStatusField(field) {
    if (this.formErrors[field]) {
      return 'field-error';
    } else {
      return 'field-enabled';
    }
  }

  showLegend(field) {
    if (!this.registerForm.controls[field].pristine || this.registerForm.controls[field].touched) {
      if (this.formErrors[field]) {
        return 'error-legend';
      } else {
        return 'show-legend';
      }
    }
  }

  setFile() {
    this.file = this.importSelectorRef.nativeElement.files[0];
    const reader = new FileReader();
    if (this.file) {
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          this.fileSize = {
            size: this.file.size / 1000000,
            height: img.naturalHeight,
            width: img.naturalWidth,
          };
          this.photoValidator();
        };
      };
    }
  }
}
