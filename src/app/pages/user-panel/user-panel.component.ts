import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser } from 'src/app/interfaces/iuser';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {

  isOpen = false;

  userEditForm: FormGroup;

  usersService = inject(UsersService);
  activatedRoute = inject(ActivatedRoute);

  userData!: IUser;
  isFormDisabled: boolean = true;
  arrReservations: any[] = [];
  editButton: string = 'Edit';


  showAlert = false;
  hide = false;

  showAlert2 = true;
  hiden = false;

  fragment: string | null = '';



  constructor() {
    this.userEditForm = new FormGroup({
      first_name: new FormControl(null, []),
      last_name: new FormControl(null, []),
      email: new FormControl(null, []),
      passport: new FormControl(null, []),
      membership: new FormControl(),
      phone: new FormControl()

    });

  }

  async ngOnInit() {

    this.userEditForm.disable();
    try {
      this.userData = await this.usersService.getLoggedUser()
      this.userEditForm.patchValue({ first_name: this.userData.first_name });
      this.userEditForm.patchValue({ last_name: this.userData.last_name });
      this.userEditForm.patchValue({ email: this.userData.email });
      this.userEditForm.patchValue({ phone: this.userData.phone });
      this.userEditForm.patchValue({ passport: this.userData.passport });
      this.userEditForm.patchValue({ membership: this.userData.membership });
      console.log(this.userData)

      this.arrReservations = await this.usersService.getAllReservations({ userId: this.userData.id })

      this.activatedRoute.fragment.subscribe(fragment => { this.fragment = fragment; });

      console.log(this.arrReservations);

    } catch (error) {
      console.log(error)
    }


  }

  scrollToSection() {
    setTimeout(() => {
      document.querySelector('#' + this.fragment)!.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  ngAfterViewInit() {
    this.scrollToSection();
  }

  async editToggle() {
    if (this.isFormDisabled) {
      this.userEditForm.enable();
      this.userEditForm.controls['membership'].disable();
    } else {
      this.userEditForm.disable();
      console.log(this.userEditForm.value)
      await this.usersService.editUser(this.userData.id, this.userEditForm.value)
    }
    this.editButton = this.editButton === 'Edit' ? 'Save' : 'Edit';
    this.isFormDisabled = !this.isFormDisabled;
  }


  onClick() {
    this.showAlert = !this.showAlert;
  }

  onCloseAlert() {
    this.showAlert = false;
  }

  onClick2($event: Event) {
    this.hiden = !this.hiden;
    this.showAlert2 = !this.showAlert2;
  }

  onCloseAlert2() {
    this.showAlert2 = false;
  }

  toggleForm() {
    this.isOpen = !this.isOpen;
  }

}












// @Component({
//   selector: 'app-your-component',
//   templateUrl: './your-component.component.html',
//   styleUrls: ['./your-component.component.css']
// })
// export class YourComponent implements OnInit {
//   myForm: FormGroup;
//   dataArray = [ /* Your array of data */ ];
//   initialFormData: any; // To store the selected form data

//   constructor(private formBuilder: FormBuilder) {}

//   ngOnInit() {
//     // You might initially set it to the first element or some default data
//     this.setInitialFormData(0); // Set initial form data for the first element
//     this.initializeForm();
//   }

//   initializeForm() {
//     this.myForm = this.formBuilder.group({
//       name: [this.initialFormData.name],
//       email: [this.initialFormData.email],
//       // Add more form controls based on your data structure
//     });
//   }

//   // Function to set initial form data based on selection
//   setInitialFormData(index: number) {
//     if (index >= 0 && index < this.dataArray.length) {
//       this.initialFormData = this.dataArray[index];
//     } else {
//       // Handle invalid index or out-of-bounds scenario
//       // For example, setting some default initial data
//       this.initialFormData = { name: '', email: '' };
//     }
//   }

//   // Function to handle form submission
//   onSubmit() {
//     const formData = this.myForm.value;
//     // Process the form data (submit or further handling)
//     console.log(formData);
//   }
// }
