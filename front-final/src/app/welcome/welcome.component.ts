import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  username: string = '';
  lastLogin: any = {};

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fetchUserData();
  }


  fetchUserData() {
    const username = this.authService.getLoggedInUser();

    if (username) {
      this.http.get<any>(`http://localhost:8080/api/userdata/lastsession/${username}`).subscribe(
        (data) => {
          this.username = username;
          this.lastLogin.startTime = data.startTime;
          this.lastLogin.endTime = data.endTime;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    } else {
      this.router.navigate(['/login']);
      console.error('User not logged in.');
    }
  }
  logout() {
    this.authService.logout();
  }
}
