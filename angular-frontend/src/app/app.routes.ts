import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { ContractListComponent } from './components/contract/contract-list/contract-list.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { ContractCreateComponent } from './components/contract/contract-create/contract-create.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'customers-list', component: CustomerListComponent },
    { path: 'contracts-list', component: ContractListComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegistrationComponent},
    { path: 'add-customer', component: CustomerCreateComponent },
    { path: 'add-contract', component: ContractCreateComponent },

];

    // { path: 'contract-create', component: ContractCreateComponent }, 
