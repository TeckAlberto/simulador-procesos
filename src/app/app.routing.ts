import { Route } from "@angular/router";
import { ManualInputComponent } from "./input/manual-input/manual-input.component";
import { LayoutComponent } from "./layout/layout.component";
import { BatchProcessingComponent } from "./simulators/batch-processing/batch-processing.component";

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
                path: 'batch-processing',
                component: BatchProcessingComponent,
                data: {
                    title: 'Procesamiento por lotes'
                }
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'manual-input'
            }
        ]
    }
];