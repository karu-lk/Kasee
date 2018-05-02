import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../services/userProfile/user-profile.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css']
})
export class UserVerificationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userProfileService: UserProfileService) { }
  pin: string;
  userId: string;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('---' + JSON.stringify(params));
      this.userId = params.verificationToken;
    });
  }
  verifyNewUser() {
    this.userProfileService.verifyUserPin(this.userId, this.pin).then(result => {
      console.log(`Successfully created a pending user ${JSON.stringify(result)}`);

    });
  }
}