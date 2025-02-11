import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class InteractiveComponent {
  // Current stage number for multi-stage flow
  stage: number = 1;
  username: string = '';

  // Coordinates for the "No" button position
  noBtnStyle = {
    top: '50%',
    left: '50%'
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router) {}

  // When the user clicks "Yes"
  onYes() {
    if (this.stage < 3) {
      // Proceed to next stage
      this.stage++;
    } else {
      // Final stage reached, navigate to celebratory page.
      // For demonstration, using a dummy username.
      this.username = this.route.snapshot.paramMap.get('username') ?? '';
      this.router.navigate(['/celebration', this.username]);
    }
  }

  // When the user attempts to click "No"
  onNo() {
    // Display a silly message
    // alert("Oops! The 'No' button is playing hide-and-seek. Try 'Yes' instead!");
    // Optionally, move the "No" button to a random location on the screen
    const randomTop = Math.floor(Math.random() * 80) + 10; // 10% to 90%
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    this.noBtnStyle = {
      top: `${randomTop}%`,
      left: `${randomLeft}%`
    };
  }
}
