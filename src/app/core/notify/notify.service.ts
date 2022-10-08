import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FuseConfirmationService } from "@fuse/services/confirmation";

@Injectable({
    providedIn: 'root'
})
export class NotifyService {

    constructor(public _fuseConfirmationService: FuseConfirmationService) {

    }


    showError(errorResponse: HttpErrorResponse){
        if([422].includes(errorResponse.status)) 
            this.error400(errorResponse.error);
        else{
            this.error500(errorResponse.status);
        }
    }

    error400(error: any) {
        let msg: string = '';
        let keys = Object.keys(error)
        for (let key of keys) {
            for (let item of error[key]) {
                msg += `<li>${key} ${item}</li>`
            }
        }

        this._fuseConfirmationService.open({
            title: 'System Alert',
            message: `<ul>${msg}</ul>`,
            icon: {
                show: true,
                name: 'heroicons_outline:exclamation',
                color: 'warning'
            },
            actions: {
                cancel: {
                    show: false
                },
                confirm: {
                    label: 'OK'
                }
            }
        });
    }

    error500(errorCode) {
        this._fuseConfirmationService.open({
            title: 'Internal Error',
            message: `An unexpected error occurred. Please try again. If the problem continues, contact wiht your administrator.
            <br> <b>Error code: </b>${errorCode}`,
            icon: {
                show: true,
                name: 'heroicons_outline:x-circle',
                color: 'warn'
            },
            actions: {
                cancel: {
                    show: false
                },
                confirm: {
                    label: 'OK'
                }
            }
        })
    }

    unknownError(errorResponse: HttpErrorResponse){
        this._fuseConfirmationService.open({
            title: 'Unknown Error',
            message: `${errorResponse.message} <br> <b>Error code: </b>${errorResponse.status}`,
            icon: {
                show: true,
                name: 'heroicons_outline:x-circle',
                color: 'warn'
            },
            actions: {
                cancel: {
                    show: false
                },
                confirm: {
                    label: 'OK'
                }
            }
        })

    }
}
