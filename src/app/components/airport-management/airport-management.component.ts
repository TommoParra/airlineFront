import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAirport } from 'src/app/interfaces/iairport';
import { AirportsService } from 'src/app/services/airports.service';

@Component({
  selector: 'app-airport-management',
  templateUrl: './airport-management.component.html',
  styleUrls: ['./airport-management.component.css']
})
export class AirportManagementComponent {

  airportSearchForm: FormGroup;
  airportEditForm: FormGroup;
  isOpen = false;


  airportService = inject(AirportsService);

  isFormDisabled: boolean = true;
  arrAirports: IAirport[] = []
  targetAirport!: IAirport;
  error: boolean = false;
  editButton: string = 'Edit airport';


  constructor() {
    this.airportSearchForm = new FormGroup({
      airport_id: new FormControl(null, [Validators.required]),
    })

    this.airportEditForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      name_acr: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      city_acr: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      country_acr: new FormControl(null, [Validators.required]),
      terminals: new FormControl(null, [Validators.required]),
      gates: new FormControl(null, [Validators.required]),
      img: new FormControl(null, [Validators.required])

    });
  }

  toggleForm() {
    this.isOpen = !this.isOpen;
  }

  async ngOnInit() {
    this.arrAirports = await this.airportService.getAll();
    this.airportEditForm.disable();
  }

  async getAirport() {
    console.log(this.airportSearchForm.value.airport_id)
    this.targetAirport = await this.airportService.getById(this.airportSearchForm.value.airport_id)

    this.airportEditForm.patchValue({ name: this.targetAirport.name });
    this.airportEditForm.patchValue({ name_acr: this.targetAirport.name_acr });
    this.airportEditForm.patchValue({ city: this.targetAirport.city });
    this.airportEditForm.patchValue({ city_acr: this.targetAirport.city_acr });
    this.airportEditForm.patchValue({ country: this.targetAirport.country });
    this.airportEditForm.patchValue({ country_acr: this.targetAirport.country_acr });
    this.airportEditForm.patchValue({ terminals: this.targetAirport.terminals });
    this.airportEditForm.patchValue({ gates: this.targetAirport.gates });
    this.airportEditForm.patchValue({ img: this.targetAirport.img });
    console.log(this.airportEditForm.value)
  }

  //Need to check both somehow.
  checkSelect(controlName: string, errorName: string) {
    return this.airportSearchForm.get(controlName)?.hasError(errorName) && this.airportSearchForm.get(controlName)?.touched;
  }

  checkError(controlName: string, errorName: string) {
    return this.airportEditForm.get(controlName)?.hasError(errorName) && this.airportEditForm.get(controlName)?.touched;
  }

  async editToggle() {
    if (this.isFormDisabled) {
      this.airportEditForm.enable();
    } else {
      if (this.airportSearchForm.valid && this.airportEditForm.valid) {
        this.airportEditForm.disable();
        await this.airportService.editAirport(this.airportSearchForm.value.airport_id, this.airportEditForm.value)
      } else {
        this.error = true;
      }

    }
    this.editButton = this.editButton === 'Edit airport' ? 'Save' : 'Edit airport';
    this.isFormDisabled = !this.isFormDisabled;
  }

}
