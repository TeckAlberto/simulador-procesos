import { Route } from "@angular/router";
import { EmptyAutomaticInputGuard } from "./guards/empty-automatic-input.guard";
import { EmptyManualInputGuard } from "./guards/empty-manual-input.guard";
import { AutomaticInputComponent } from "./input/automatic-input/automatic-input.component";
import { ManualInputComponent } from "./input/manual-input/manual-input.component";
import { LayoutComponent } from "./layout/layout.component";
import { BatchProcessingComponent } from "./simulators/batch-processing/batch-processing.component";
import { MultiprogrammingComponent } from "./simulators/multiprogramming/multiprogramming.component";

export const AppRoutes : Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path : 'manual-input',
                component: ManualInputComponent,
                data: {
                    title: 'Ingresar procesos'
                }
            },
            {
                path: 'input',
                component: AutomaticInputComponent,
                data: {
                    title: 'Ingresar cantidad de procesos',
                    redirect: ['multiprogramming']
                }
            },
            {
                path: 'batch-processing',
                component: BatchProcessingComponent,
                canActivate: [ EmptyManualInputGuard ],
                data: {
                    title: 'Procesamiento por lotes'
                }
            },
            {
                path: 'multiprogramming',
                component: MultiprogrammingComponent,
                canActivate: [ EmptyAutomaticInputGuard ],
                data: {
                    title: 'Procesamiento con multiprogramación'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'input'
            }
        ]
    }
];