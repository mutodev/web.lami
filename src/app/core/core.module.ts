import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseAlertModule } from '@fuse/components/alert';
import { AuthModule } from 'app/core/auth/auth.module';
import { IconsModule } from 'app/core/icons/icons.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { AlertyModule } from 'app/shared/components/alerty/alerty.module';
import { ListenerService } from './services/listener.service';
import { RealTimeService } from './services/real-time.service';
import { SseService } from './services/sse.service';

@NgModule({
    imports: [
        AuthModule,
        IconsModule,
        TranslocoCoreModule,
        MatSnackBarModule,
        AlertyModule
    ],
    providers: [SseService, RealTimeService, ListenerService]
})
export class CoreModule
{
    /**
     * Constructor
     */
    constructor(
        @Optional() @SkipSelf() parentModule?: CoreModule
    )
    {
        // Do not allow multiple injections
        if ( parentModule )
        {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }
    }
}
