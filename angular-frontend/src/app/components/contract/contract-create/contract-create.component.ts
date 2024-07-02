import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Contract } from '../../../shared/interface/contract';
import { Customer } from '../../../shared/interface/customer';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-contract-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,    
      NgForOf,
      NgIf,
      RouterLink,
         
  ],
  providers: [NgFor],
  templateUrl: './contract-create.component.html',
  styleUrl: './contract-create.component.css'
})
export class ContractCreateComponent implements OnInit {
  
  insuranceTypes!: string[];
  insuranceHolders!: string[];
  isUpdateMode: boolean = false;
  contractId: string | null = null

  apiService = inject(ApiService);
  router = inject(Router);
  route = inject(ActivatedRoute);

    
  creationStatus: { success: boolean; message: string } = {
      success: false,
      message: 'Not created yet'
   };



    form = new FormGroup({
        start_date: new FormControl(new Date(), Validators.required),
        end_date: new FormControl(new Date(), Validators.required),
        insurance_type: new FormControl('', Validators.required),
        insurance_holder: new FormControl('', Validators.required)
    });


    ngOnInit(): void {
        this.form;
        this.loadContractTypes();
        this.loadCustomers();
        this.contractId = this.route.snapshot.paramMap.get('id');

        if (this.contractId) {
            this.isUpdateMode = true;
            this.loadContractDetails(this.contractId)
        }
    }  
  
 
    onSubmit() {
        if (this.form.valid) {    
            const contract = this.form.value as Contract;
            if (this.isUpdateMode) {
                this.apiService.updateContract(this.contractId!, contract).subscribe({
                next: (response) => {
                    this.router.navigate(['contracts-list']);
                },
                error: (err) => {
                    console.log(err);
                },
                complete: () => {
                    console.log(contract);
                }
              });
            } else {
                this.apiService.createContract(contract).subscribe({
                next: (response) => {
                    this.form.reset();
                    this.router.navigate(['contracts-list'])
                },
                error:(err)=>{
                    console.log(err);
                },
                complete: ()=> {
                    console.log(contract);
                }
              });
            }
        }
    }                 
    

    loadCustomers() {
        this.apiService.getCustomerNames().subscribe(insuranceHolders => {
        this.insuranceHolders = insuranceHolders;
        });
    }
    
        
    loadContractDetails(contractId: string) {
        this.apiService.getContractById(contractId).subscribe({
        next: (contract: Contract) => {
            this.form.patchValue(contract)
        },
        error: (err: any) => {
            console.log(err);
        }
        });
    }

    loadContractTypes() {
        this.apiService.getContractTypes().subscribe((insuranceTypes: string[])=> {
        this.insuranceTypes = insuranceTypes;    
        });
      }
    }




