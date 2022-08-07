import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName
} from "@angular/forms";
import { AuthService } from "../../service/auth.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  title = "app-login";
  submitted: boolean = false;
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let body = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log(body)
    this.authService.login(body).subscribe((data) => {
      console.log(data)
      //your will get data success or false
      if (data.success) {
        //do some action
      } else {
        //do some action
        //show error message
      }
    })
  }
}
