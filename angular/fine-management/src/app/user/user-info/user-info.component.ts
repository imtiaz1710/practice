import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  private json = <string>localStorage.getItem('user');
  user: User = JSON.parse(this.json);

  editForm: FormGroup;

  viewMode: boolean = true;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: [this.user.name],
      phoneNo: [this.user.phoneNo],
      designation: [this.user.designation],
      address: [this.user.address]
    });
  }

  onClick() {
    this.viewMode = !this.viewMode;
  }

  onEdit() {
    this.user.name = this.editForm.value.name;
    this.user.designation = this.editForm.value.designation;
    this.user.phoneNo = this.editForm.value.phoneNo;
    this.user.address = this.editForm.value.address;

    this.http
      .put<any>(`http://localhost:3000/singupUsers/${this.user.id}`, this.user)
      .subscribe({
        next: (res: any) => {
          this.toasterService.success('Profile Info Successfully Updated!');
          // this.editForm.reset();
        },
        error: (err: any) => this.toasterService.error('Error!')
      });
  }
}
