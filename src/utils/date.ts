//function creates date object by specific formats.
//функция создает объект даты по заданным форматам.
export const getFullDate = (dateString:string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const format = (number: number) => number < 10 ? `0${number}` : `${number}`;
    //returns date likes this: 2023:01:11, 12:30
    return `${year}/${format(month)}/${format(day)}, ${format(hours)}:${format(minutes)}`;
}