import { Injectable } from "@angular/core";
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { cloneDeep } from "lodash";
import { customers as customersData , identficationType as identificationTypeData} from "app/mock-api/contact/customer/data"

@Injectable({
    providedIn: 'root'
})
export class CustomerMockApi {

    private _customers: any[] = customersData;
    private _identificationTypes: any = identificationTypeData;
    /**
    * Constructor
    */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    registerHandlers(): void {


        // -----------------------------------------------------------------------------------------------------
        //  GET - All
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('/customer', 300)
            .reply(({ request }) => {
                let data: any = {}

                let message = ''
                let status = ''

                // Clone the products
                let customers: any[] | null = cloneDeep(this._customers);

                const page = request.params.get('page');

                if (page) {
                    data.data =customers
                    // Return the response
                    return [
                        200,
                        {
                            data,
                            message,
                            status
                            
                        }
                    ];
                }

                return [
                    200,
                    {
                        data: customers,
                        message,
                        status
                        
                    }
                ];
                
            });

         // -----------------------------------------------------------------------------------------------------
        //  GET IDENTIFICATION TYPE
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('/setting/IDENTIFICATION_TYPE', 300)
            .reply(({ request }) => {
                let data: any = {}

                let message = ''
                let status = ''

                // Clone the products
                let identificationtypes: any[] | null = cloneDeep(this._identificationTypes);
                data = identificationtypes;
              
                // Return the response
                return [
                    200,
                    {
                        ...identificationtypes,
                        message,
                        status
                    }
                ];
            });

        

        // -----------------------------------------------------------------------------------------------------
        // @ POST
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onPost('api/customer')
            .reply(() => {
                // Return the response
                return [200, {}];

            });
    }
}