import { Moment } from "moment";

export class CIFormatter {

    static dateRequestFormat(date: Moment): string {
        return date.format('YYYY-MM-DD');
    }
}
