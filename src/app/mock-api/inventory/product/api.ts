import { Injectable } from "@angular/core";
import { FuseMockApiService } from "@fuse/lib/mock-api";
import { products as productData } from "app/mock-api/inventory/product/data"
import { cloneDeep } from "lodash";

@Injectable({
    providedIn: 'root'
})
export class ProductMockApi {
    private _products: any[] = productData;

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
            .onGet('/product', 300)
            .reply(({ request }) => {
                let data: any = {}

                let message = ''
                let status = ''

                // Clone the products
                let products: any[] | null = cloneDeep(this._products);
                data = products

                // Return the responseß
               
                return [
                    200,
                    {
                        data: products,
                        message,
                        status
                        
                    }
                ];
            });
    }
}