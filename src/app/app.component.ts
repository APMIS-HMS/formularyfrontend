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
      company: ['', [<any>Validators.required, Validators.minLength(3)]],
      form: [''],
      route: [''],
      ingredientName: [''],
      manufacturer: ['', [<any>Validators.required]],
      genericName: [''],
      facilityId: ['', [<any>Validators.required]],
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
