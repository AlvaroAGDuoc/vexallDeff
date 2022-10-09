import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.page.html',
  styleUrls: ['./splash-screen.page.scss'],
})
export class SplashScreenPage implements OnInit {

  value = 0;
  loading = true;



  constructor(private router: Router) {

    this.loadContent();
  }


  loadContent() {
    this.loading = true;
    const subs$: Subscription = interval(200).subscribe(res => {
      this.value = this.value + 15;
      if (this.value === 120) {
        subs$.unsubscribe();
        this.loading = false;
        this.value = 0;
        this.router.navigate(['/login']);
      }
    });
  }



  ngOnInit() {
  }

}
