import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Customer } from '../../../shared/interface/customer';
import { NgIf, NgFor} from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-customer-create',
    standalone: true,
    imports: [
        FormsModule,       
        ReactiveFormsModule,
        NgFor,
        NgIf,    
        RouterLink
    ],
    templateUrl: './customer-create.component.html',
    styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent {

    genders!: string[];
    isUpdateMode: boolean = false;
    customerId: string | null = null
    
    apiService = inject(ApiService);
    router = inject(Router);
    route = inject(ActivatedRoute);

   
    form = new FormGroup({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        date_of_birth: new FormControl(new Date(), Validators.required),
        gender: new FormControl('', Validators.required),
        nationality: new FormControl('', Validators.required),
        id_card_number: new FormControl('', [Validators.required,
        Validators.min(6), Validators.max(20)],
        ),
        passport_number: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        phone_number: new FormControl('', Validators.required),     
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+$')
        ])
    });
        
    

    ngOnInit(): void {
      this.form;
      this.loadGenders();
      this.customerId = this.route.snapshot.paramMap.get('id');

      if (this.customerId) {
          this.isUpdateMode = true;
          this.loadCustomerDetails(this.customerId)
        }
    } 
   
    onSubmit() {
        if (this.form.valid) {
            const customer = this.form.value as Customer;
            if (this.isUpdateMode) {
                this.apiService.updateCustomer(this.customerId!, customer).subscribe({
                    next: (response) => {
                        this.router.navigate(['customers-list']);
                    },
                    error: (err) => {
                        console.log(err);
                    },
                    complete: () => {
                        console.log(customer);
                    }
                });
            } else {
                this.apiService.createCustomer(customer).subscribe({
                    next: () => {
                        this.form.reset();
                        this.router.navigate(['customers-list'])
                    },
                    error: (err) => {
                        console.log(err);
                    },
                    complete: () => {
                        console.log(customer);
                    }
                });
            }
        }       
    }

    loadGenders() {
        this.apiService.getCustomerGender().subscribe((genders: string[]) => { 
        this.genders = genders;
        console.log(genders);
     });
    }

    loadCustomerDetails(customerId: string) {
    this.apiService.getCustomerById(customerId).subscribe({
        next: (customer: Customer) => {
            this.form.patchValue(customer)
        },
        error: (err) => {
            console.log(err);
        }
      });
    }
        
}



