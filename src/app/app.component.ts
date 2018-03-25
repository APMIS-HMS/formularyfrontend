import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  suggest = false;

  constructor(private formBuilder: FormBuilder){}

  public frm_newProduct: FormGroup;
  public ingredientForm: FormGroup;
  public variantsForm: FormGroup;

  ngOnInit() {
    this.frm_newProduct = this.formBuilder.group({
      productName: ['', [<any>Validators.required]],
      productType: ['', [<any>Validators.required]],
      brand: ['', [<any>Validators.required]],
      drugForm: ['', [<any>Validators.required]],
      ingrident: ['', [<any>Validators.required]],
      route: ['', [<any>Validators.required]],
      manufacturer: ['', [<any>Validators.required]],
      frequency: ['', [<any>Validators.required]],
      unit: ['', [<any>Validators.required]],
    });

    this.ingredientForm = this.formBuilder.group({
      ingredientName: [''],
      ingredientSize: ['', [<any>Validators.required]],
      ingredientUnit: [''],
    });

    this.variantsForm = this.formBuilder.group({
      variantSize: [''],
      variantUnit: [''],
    });
  }

  onKeydown(){
    this.suggest = true;
  }
  suggestion_click(){
    this.suggest = false;
  }

}
