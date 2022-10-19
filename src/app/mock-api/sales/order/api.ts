import { Injectable } from "@angular/core";
import { FuseMockApiService, FuseMockApiUtils } from '@fuse/lib/mock-api';
import { cloneDeep } from "lodash";
import { orders as ordersData } from "app/mock-api/sales/order/data"

@Injectable({
    providedIn: 'root'
})
export class OrderMockApi {

    private _orders: any[] = ordersData;

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
            .onGet('/order', 300)
            .reply(({ request }) => {
                let data: any = {}

                let message = ''
                let status = ''

                const id = request.params.get('id');
                console.log("🚀 ~ file: api.ts ~ line 36 ~ OrderMockApi ~ .reply ~ id", id)

                if (id) {
                    // Clone the products
                    const orders = cloneDeep(this._orders);

                    // Find the product
                    const order = orders.find(item => item.id === id);

                    return [
                        200,
                        {
                            data:order,
                            message,
                            status
                        }
                    ];
                }

                // Clone the products
                let orders: any[] | null = cloneDeep(this._orders);
                data.data = orders

                // Return the response
                return [
                    200,
                    {
                        data,
                        message,
                        status
                    }
                ];
            });


    }
}