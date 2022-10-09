import { Component, Injectable, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})

@Injectable({
  providedIn: 'root'
})
export class LoadingPage implements OnInit {


  
  value = 0;
  loading = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  loadContent(pag) {
    this.loading = true;
    const subs$: Subscription = interval(200).subscribe(res => {
      this.value = this.value + 60;
      if (this.value === 120) {
        subs$.unsubscribe();
        this.loading = false;
        this.value = 0;
        this.router.navigate(['/' + pag]);
      }
    });
  }

}
