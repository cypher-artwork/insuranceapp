import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Customer } from '../interface/customer';
import { Contract } from '../interface/contract';


const API_URL = `${environment.apiURL}/api`

@Injectable({
  providedIn: 'root'})


  export class ApiService {
    

  http:HttpClient = inject(HttpClient);
  
            
    // Customer methods
    getCustomers(): Observable<Customer[]> {
      return this.http.get<Customer[]>(`${API_URL}/customers/`);
    }
    
    getCustomer(id: number): Observable<Customer> {
      return this.http.get<Customer>(`${API_URL}/customers/${id}/`);
    }
  
    getCustomerById(id: string): Observable<Customer>{
      return this.http.get<Customer>(`${API_URL}/customers/${id}`);
    }
  
    createCustomer(customer: Customer) {
      return this.http.post<Customer[]>(`${API_URL}/customers/`, customer);
    }
  
    updateCustomer(id: string, customer: Customer): Observable<Customer> {
      return this.http.put<Customer>(`${API_URL}/customers/${id}/`, customer);
    }
  
    deleteCustomer(id: number): Observable<Customer[]> {
      return this.http.delete<Customer[]>(`${API_URL}/customers/${id}/`);
    }
  
    // Contract methods
    getContracts(): Observable<Contract[]> {
      return this.http.get<Contract[]>(`${API_URL}/contracts`);
    }
  
    getContractById(id: string): Observable<Contract> {
      return this.http.get<Contract>(`${API_URL}/contracts/${id}/`);
    }

    getContractTypes() {
      return this.http.get<string[]>(`${API_URL}/contract-types`);
    }
  
    createContract(contract: Contract): Observable<Contract> {
      return this.http.post<Contract>(`${API_URL}/contracts/`, contract);
    }
  
    updateContract(id: string, updateContract: Contract): Observable<Contract> {
      return this.http.put<Contract>(`${API_URL}/contracts/${id}/`, updateContract);
    }
  
    deleteContract(id: number): Observable<Contract[]> {
      return this.http.delete<Contract[]>(`${API_URL}/contracts/${id}/`);
    }

    getCustomerGender() {
      return this.http.get<string[]>(`${API_URL}/customer-genders`);
    }
  
    getCustomerNames(): Observable<string[]> {
      return this.http.get<Customer[]>(`${API_URL}` + `/customers/`)
        .pipe(
          map(customers => customers.map(customer => `${customer.firstname} ${customer.lastname}`))
        );
    }  
  
  }
  
    

