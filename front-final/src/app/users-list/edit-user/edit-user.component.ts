import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO } from '../../models/user-dto.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  username: string;
  user: any = {
    username: '',
    mail: '',
    nombres: '',
    apellidos: '',
    sessionActive: false,
    identificacion: '',
    status: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      console.log("Editing user:", this.username);

    });

    if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
      this.user = this.router.getCurrentNavigation().extras.state.user;
    } else {
      this.fetchUserDetails(this.username);
    }
  }

  fetchUserDetails(username: string): void {
    this.http.get<any>(`http://localhost:8080/api/users/${username}`).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user details:', error);

      }
    );
  }


  submitForm(): void {
    if (this.username) {
      this.http.put<UserDTO>(`http://localhost:8080/api/users/edit/${this.username}`, this.user as UserDTO)

        .subscribe({
          next: (updatedUser) => {
            console.log('User updated successfully', updatedUser);

            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Error updating user:', error);

          }
        });
    }
  }

}
