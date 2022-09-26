import { Route } from "@angular/router";
import { BcpViewerComponent } from "./viewers/bcp-viewer/bcp-viewer.component";
import { BcpGuard } from "./guards/bcp.guard";
import { EmptyAutomaticInputGuard } from "./guards/empty-automatic-input.guard";
import { EmptyManualInputGuard } from "./guards/empty-manual-input.guard";
import { AutomaticInputComponent } from "./input/automatic-input/automatic-input.component";
import { ManualInputComponent } from "./input/manual-input/manual-input.component";
import { LayoutComponent } from "./layout/layout.component";
import { BatchProcessingComponent } from "./simulators/batch-processing/batch-processing.component";
import { FcfsContinuacionComponent } from "./simulators/fcfs-continuacion/fcfs-continuacion.component";
import { FcfsComponent } from "./simulators/fcfs/fcfs.component";
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
                    redirect: ['fcfs-2']
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
                path: 'fcfs',
                component: FcfsComponent,
                canActivate:  [ EmptyAutomaticInputGuard ],
                data: {
                    title: 'First Come First Served'
                }
            },
            {
                path: 'fcfs-2',
                component: FcfsContinuacionComponent,
                canActivate: [ EmptyAutomaticInputGuard ],
                data: {
                    title: 'First Come First Served II'
                }
            },
            {
                path: 'bcp',
                component: BcpViewerComponent,
                canActivate: [ BcpGuard ],
                data: {
                    title: 'Ver BCPs'
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