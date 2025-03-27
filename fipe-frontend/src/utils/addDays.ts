import dayjs from "dayjs";

export function addDays(days: number): Date{
    return dayjs().add(days, "days").toDate();
}