import { Component } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Device } from './led'
import { LedService } from './led.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iotLed';
  leds$: Observable<Device[]>;

  constructor(private ledService: LedService) {

  }
  ngOnInit(): void {
    this.leds$ = <Observable<Device[]>>
      this.ledService.getLeds();
  }

  changeLed(led: Device) {
    this.ledService.
      changeLed(led.id, led.customer_status === 0 ? 1 : 0).
      subscribe((value: any) => {
        if (value.succ) {
          if (led.customer_status == 0) {
            led.customer_status = 1;
            led.status = 1;
          }
          else {
            led.customer_status = 0
            led.status = 0;
          }
        }
      });
  }

}
