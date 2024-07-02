import { Component, OnInit, inject } from '@angular/core';
import { Contract } from '../../../shared/interface/contract';
import { ApiService } from '../../../shared/services/api.service';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-contract-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './contract-list.component.html',
  styleUrl: './contract-list.component.css'
})
export class ContractListComponent implements OnInit {

  contracts: Contract[] = [];

  apiService = inject(ApiService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadContractsList();
  }
  
    
  loadContractsList() {
    this.apiService.getContracts().subscribe((contracts: Contract[]) => {
      this.contracts = contracts;
    })
  }

  
  deleteContract(contractId: number) {
    this.apiService.deleteContract(contractId).subscribe({
      next: () => {
        console.log(`Contract with ${contractId} was deleted`);
        this.loadContractsList();
      },
      error: (err: any) => {
        console.error(`Error while deleting contract ${contractId}`, err)
      }
    });
  }

  updateContract(contractId: number) {
    this.router.navigate(['add-contract', { id: contractId }]);
  }  

}
  

