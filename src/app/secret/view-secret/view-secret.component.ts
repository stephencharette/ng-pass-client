import { Component } from '@angular/core';
import { RoutingService } from '../../services/routing/routing.service';

@Component({
  selector: 'app-view-secret',
  standalone: true,
  imports: [],
  templateUrl: './view-secret.component.html',
  styleUrl: './view-secret.component.css',
})
export class ViewSecretComponent {
  id: string = '';
  constructor(private routingService: RoutingService) {}

  ngOnInit() {
    this.routingService.getQueryParam('id')
      .subscribe((id) => {
        this.id = id;
      });
  }
}
