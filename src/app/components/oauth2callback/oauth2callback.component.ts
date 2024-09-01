import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  standalone: true,
  selector: 'app-oauth2callback',
  templateUrl: './oauth2callback.component.html',
  styleUrls: ['./oauth2callback.component.css']
})
export class Oauth2callbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    const code: string = this.route.snapshot.queryParamMap.get("code") || "";
    const return_url = this.route.snapshot.queryParamMap.get("state") || "/";

    this.tokenService.signInWithOAuthCode(code).subscribe(data => {
      this.router.navigateByUrl(return_url);
    })
  }
}
