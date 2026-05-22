import { Routes } from '@angular/router';

import { MainLayout }
from './layouts/main-layout/main-layout';

import { ClientList }
from './features/clients/pages/client-list/client-list';

import { AccountList }
from './features/accounts/pages/account-list/account-list';

import { MovementList }
from './features/movements/pages/movement-list/movement-list';

import { ReportList }
from './features/reports/pages/report-list/report-list';

export const routes: Routes = [
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
      },
  
  {
    path: '',
    component: MainLayout,

    children: [

      {
        path: 'clients',
        component: ClientList
      },

      {
        path: 'accounts',
        component: AccountList
      },

      {
        path: 'movements',
        component: MovementList
      },

      {
        path: 'reports',
        component: ReportList
      }
    ]
  }
];
