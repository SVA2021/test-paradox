import { Injectable } from '@angular/core';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getTuiDayTimeFromTimestamp(timestamp: number): [TuiDay | null, TuiTime | null] {
    const date = new Date(timestamp);
    const day: TuiDay = new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
    const time: TuiTime = new TuiTime(date.getHours(), date.getMinutes());
    return [day, time];
  }

  getTimeStampFromTuiDateTime(datetime: [TuiDay | null, TuiTime | null] | null | undefined): number | null {
    if (!datetime) {
      return null;
    }
    const day = datetime[0] ? datetime[0].toLocalNativeDate().getTime() : 0;
    const time: number = datetime[1] ? datetime[1]?.toAbsoluteMilliseconds() : 0;
    return day + time;
  }
}
