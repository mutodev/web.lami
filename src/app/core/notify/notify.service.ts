import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FuseConfirmationService } from "@fuse/services/confirmation";
import { AlertyComponent } from "app/shared/components/alerty/alerty.component";




const INTERNAL_ERROR =  `Se ha producido un error inesperado. Inténtelo de nuevo. Si el problema continúa, póngase en contacto con su administrador.`;
@Injectable({
    providedIn: 'root'
})
export class NotifyService {

    durationInSeconds = 5
    constructor(public _fuseConfirmationService: FuseConfirmationService,
        private _snackBar: MatSnackBar) {

    }


    showError(errorResponse: HttpErrorResponse){
        if([422].includes(errorResponse.status))
            this.error400(errorResponse.message);
        else{
            this.error500(errorResponse.status);
        }
    }

    dispalyErrorMsg(msg: string = ""){
        this._fuseConfirmationService.open({
            title: 'Error Interno',
            message: msg || INTERNAL_ERROR,
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
            title: 'Error Interno',
            message: INTERNAL_ERROR,
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


    successAlert(msg:string, title:string='Mensaje'){
        setTimeout(() => {
            this._snackBar.openFromComponent(AlertyComponent,{
                duration: this.durationInSeconds * 1000,
                panelClass: ['bg-green-600'],
                data:{
                    type: 'success',
                    msg: msg,
                    title: title
                }
            })
        }, 500);

    }


    successOrdenAlert(msg: string, ) {
       this._fuseConfirmationService.open({
            title: '¡Ya Está!',
            message: msg || INTERNAL_ERROR,
            icon: {
                show: true,
                name: 'heroicons_outline:check-circle',
                color: 'success'
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


    errorDateAlert(msg: string, ) {
        this._fuseConfirmationService.open({
             title: '¡Seleccionar Fecha!',
             message: msg || INTERNAL_ERROR,
             icon: {
                 show: true,
                 name: 'heroicons_outline:check-circle',
                 color: 'error'
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


    successTestAlert(msg: string, title: string = '¡Ya Está!') {
        setTimeout(() => {
                this._snackBar.openFromComponent(AlertyComponent, {
                duration: this.durationInSeconds * 100000,
                panelClass: ['bg-white'],
                data: {
                    type: 'basic',
                    msg: msg,
                    title: title,
                    dismissible: true
                }
            })
        }, 500);

    }


}
