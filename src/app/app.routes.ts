import {Router, Routes} from '@angular/router';
import {ResultComponent} from "./pages/result/result.component";
import {SelectComponent} from "./pages/select/select.component";
import {StateService} from "./services/state.service";
import {inject} from "@angular/core";

export const routes: Routes = [
  { path: '', component: SelectComponent },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [() => {
      const state = inject(StateService);
      const router = inject(Router);
      if (state.selectedCampaign() && state.selectedCampaignOptionItem()) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    }]
  },
];
