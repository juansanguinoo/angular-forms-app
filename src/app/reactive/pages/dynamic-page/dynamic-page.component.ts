import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ]),
  });

  public newFavoriteGame: FormControl = new FormControl(
    '',
    Validators.required
  );

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es requerido';
        case 'minlength':
          return `El campo debe contener mínimo ${errors['minlength'].requiredLength} carácteres`;
      }
    }

    return null;
  }

  onAddNewFavoriteGame(): void {
    if (this.newFavoriteGame.invalid) return;

    const newGame = this.newFavoriteGame.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavoriteGame.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
