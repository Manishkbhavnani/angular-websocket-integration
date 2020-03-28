import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonsModule} from '../common/common.module';

import { DashboaredRoutingModule } from './dashboared-routing.module';
import { DashboaredComponent } from './dashboared.component';
import { OwlModule } from 'ngx-owl-carousel';

import { UserDashboaredComponent } from './user-dashboared/user-dashboared.component';
import {AuthGuardService} from '../_guard/auth.guard';
import {DashboardService} from './dashboared.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [DashboaredComponent, UserDashboaredComponent],
  imports: [
    CommonModule,
    CommonsModule,
    DashboaredRoutingModule,
    OwlModule,
    ScrollingModule,
    InfiniteScrollModule
  ] ,
  providers : [AuthGuardService , DashboardService]
})
export class DashboaredModule { }
