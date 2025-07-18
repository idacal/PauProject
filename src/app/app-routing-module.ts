import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './core/components/layout/layout';
import { DashboardLayout } from './core/components/dashboard-layout/dashboard-layout';

const routes: Routes = [
  // Landing page as independent route with dashboard header
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing-module').then(m => m.LandingModule)
  },
  // Routes that use the main layout with the global navbar
  {
    path: 'public',
    component: Layout,
    children: [
      {
        path: 'news',
        loadChildren: () => import('./pages/news/news-module').then(m => m.NewsModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./pages/contact/contact-module').then(m => m.ContactModule)
      }
    ]
  },
  // Dashboard routes with shared layout
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: 'company-information',
        loadChildren: () => import('./pages/company-information/company-information-module').then(m => m.CompanyInformationModule)
      },
      {
        path: 'market-information',
        loadChildren: () => import('./pages/market-information/market-information-module').then(m => m.MarketInformationModule)
      },
      {
        path: 'financial-information',
        loadChildren: () => import('./pages/financial-information/financial-information-module').then(m => m.FinancialInformationModule)
      },
      {
        path: 'load-assessment',
        loadChildren: () => import('./pages/load-assessment/load-assessment-module').then(m => m.LoadAssessmentModule)
      }
    ]
  },
  // Legacy routes - redirect to dashboard
  {
    path: 'company-information',
    redirectTo: '/dashboard/company-information'
  },
  {
    path: 'market-information',
    redirectTo: '/dashboard/market-information'
  },
  {
    path: 'financial-information',
    redirectTo: '/dashboard/financial-information'
  },
  {
    path: 'load-assessment',
    redirectTo: '/dashboard/load-assessment'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
