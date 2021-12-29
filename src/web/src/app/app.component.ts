import { Component } from '@angular/core';
import { VariablesService } from './services/variables.service';
import { environment } from './../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading=new BehaviorSubject<boolean>(false);
  // title = environment.appName;
  // version=environment.appVersion;
  constructor(private varS:VariablesService){
    this.loading=varS.loading;
  }
}
