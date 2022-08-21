import { Route } from "@angular/router";
import { ManualInputComponent } from "./input/manual-input/manual-input.component";
import { LayoutComponent } from "./layout/layout.component";

export const AppRoutes : Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path : 'input',
                component: ManualInputComponent,
                data: {
                    title: 'Ingresar procesos'
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