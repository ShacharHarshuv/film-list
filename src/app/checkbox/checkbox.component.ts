import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

  private readonly _isChecked$ = new BehaviorSubject<boolean>(false);
  readonly isChecked$ = this._isChecked$.asObservable();

  @Input()
  set isChecked(value: boolean) {
    this._isChecked$.next(value);
  }

  @Output('onIsCheckedChanged')
  isCheckedChangedEmitter = this._isChecked$.asObservable();

  constructor() {
  }

  toggleCheck() {
    this._isChecked$.next(!this._isChecked$.value);
  }
}
