import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService, private flashMessagesService: FlashMessagesService) { 

  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }  
    
    if(!this.validateService.validateRegister(user)) {
      console.log('Please fill in all fields');
      this.flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 2500});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)) {
      console.log('Please enter a valid email');
      this.flashMessagesService.show('Please enter a valid email', {cssClass: 'alert-danger', timeout: 2500});
      return false;
    }
  }

}
