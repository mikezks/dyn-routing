import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { LetModule, PushModule } from '@ngrx/component';
import { Observable } from 'rxjs';


export interface Toggle {
  key: string;
  label: string;
  active: boolean;
}


@Component({
  selector: 'app-dyn-ui-widget',
  standalone: true,
  imports: [
    NgFor, PushModule, LetModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <div class="card-header">
        <h6 class="card-title" style="margin: 4px">{{ title }}</h6>
      </div>

      <div class="card-body">
        <ng-container *ngFor="let c$ of config">
          <button
            *ngrxLet="c$ as toggle"
            (click)="toggleTrigger(toggle.key)"
            class="btn btn-sm"
            style="margin: 3px"
            [class.btn-info]="!toggle.active"
            [class.btn-success]="toggle.active">
            {{ toggle.label }}
          </button>
        </ng-container>
      </div>
  </div>
  `,
  styles: [`
    .card {
      margin: 20px;
      background-color: #f4f3ef;
    }
  `]
})
export class DynamicUiWidgetComponent {
  @Input() title = '';
  @Input() config: Observable<Toggle>[] = [];
  @Output() toggle = new EventEmitter<string>();

  toggleTrigger(key: string): void {
    this.toggle.emit(key);
  }
}
