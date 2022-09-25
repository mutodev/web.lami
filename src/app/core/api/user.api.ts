import { HttpClient } from "@angular/common/http";
import { User } from "app/modules/settings/user/user.types";
import { BehaviorSubject, Observable, of } from "rxjs";

const DATA = [
    {
        "_id": "6071b3d59f9fd26ef91504bc",
        "photo": {
            "Location": "https://reverse-ds-dev.s3.amazonaws.com/media/user/00dd3829-c2d7-4f3d-ac1e-f1df08febfb1.jpg",
            "Key": "media/user/00dd3829-c2d7-4f3d-ac1e-f1df08febfb1.jpg"
        },
        "reset_password": true,
        "email": "cvisbal0724@gmail.com",
        "first_name": "Carlos",
        "last_name": "Visbal",
        "profile": "Administrador",
        "active": true,
        "seller_id": "058",
        "seller_code": "1143225272",
        "city": "001",
        "operation_center": "017",
        "stall": "021",
        "state": "08",
        "updatedAt": "2022-08-11T18:38:29.574Z",
        "reset_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjA3MWIzZDU5ZjlmZDI2ZWY5MTUwNGJjIiwic2NvcGVzIjpbInJlc2V0LXBhc3N3b3JkIl0sImlhdCI6MTY0MTQ3NjM2OSwiZXhwIjoxNjQxNDc3MjY5fQ.bs_R7duhlGFH5xDupcXRb0JFnLIMXy5UzhJzNk_Uad8",
        "user_name": "cvisbal"
    }
]

export class ApiUser {


     // Private
    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient)
    {
    }

    get users$(): Observable<User[]>
    {
        return this._users.asObservable();
    }

    getUsers(): Observable<User[]>
    {
        this._users.next(DATA);
        return  of([])
    }

}