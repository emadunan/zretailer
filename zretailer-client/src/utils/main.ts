export function arrayFromNumbr(len: number) {
    return Array.from({ length: len }, (_, idx) => idx + 1);
}

export function formateDate(zDate: Date) {
    const year = zDate.getFullYear();
    let month = zDate.getMonth().toString();
    let day = zDate.getDay().toString();

    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }  

    return `${year}-${month}-${day}`;
}
