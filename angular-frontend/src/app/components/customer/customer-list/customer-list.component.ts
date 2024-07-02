import { Component, OnInit, inject } from '@angular/core';
import { Customer } from '../../../shared/interface/customer';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

    customers: Customer[] = []; 

    apiService = inject(ApiService);
    router = inject(Router);
  
    ngOnInit(): void {
      this.loadCustomersList();
      
    }    

    loadCustomersList() {
      this.apiService.getCustomers().subscribe((customers: Customer[]) => {
            this.customers = customers;
        })
    }
          
    deleteCustomer(customerId: number) {
      this.apiService.deleteCustomer(customerId).subscribe({
        next: () => {
          console.log(`Customer with ${customerId} was deleted`);
          this.loadCustomersList();
        },
        error: (err: any) => {
          console.error(`Error while deleting customer ${customerId}`, err)
        }
      });
    }

    updateCustomer(customerId: number) {
      this.router.navigate(['add-customer', {id: customerId}]);
      }       
  }


