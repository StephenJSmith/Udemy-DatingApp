import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [MemberListComponent]
})
export class MemberListModule { }
