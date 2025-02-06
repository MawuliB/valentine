import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  username: string;
  display_name: string;
}

@Component({
  selector: 'app-celebration',
  templateUrl: './celebration.component.html',
  styleUrls: ['./celebration.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class CelebrationComponent implements OnInit {
  username: string = '';
  userData: User | null = null;
  // Update this URL to match your backend
  private readonly apiUrl = 'http://127.0.0.1:8000';

  constructor(private readonly route: ActivatedRoute, private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') ?? '';
    // Fetch user data from the backend for personalization
    this.http.get<User>(`${this.apiUrl}/user/${this.username}`).subscribe({
      next: (data) => {
        this.userData = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
