export const mask: {
    date: (text: string) => string;
    cpf: (text: string) => string;
    phoneNumber: (text: string) => string;
} = {
    date: (text: string) => {
        if (!text) {
            return '';
        }
        const dBpattern: RegExp = /^\d{4}-\d{2}-\d{2}$/;
        if (dBpattern.test(text)) {
            const [year, month, day]: string[] = text.split('-');

            return `${day}/${month}/${year}`;
        }
        const formattedDate: string = text
            .replace(/\D/g, '')
            .replace(
                /(\d{2})(\d{0,2})(\d{0,4})/,
                (match: string, p1: string, p2: string, p3: string) => {
                    let result: string = p1;
                    if (p2) {
                        result += '/' + p2;
                    }
                    if (p3) {
                        result += '/' + p3;
                    }
                    return result;
                }
            );

        return formattedDate.slice(0, 10);
    },
    cpf: (text: string): string => {
        if (!text) {
            return '';
        }
        const formattedCPF: string = text
            .replace(/\D/g, '')
            .replace(
                /(\d{1,3})(\d{0,3})(\d{0,3})(\d{0,2})/,
                (
                    match: string,
                    p1: string,
                    p2: string,
                    p3: string,
                    p4: string
                ) => {
                    let result: string = p1;
                    if (p2) {
                        result += '.' + p2;
                    }
                    if (p3) {
                        result += '.' + p3;
                    }
                    if (p4) {
                        result += '-' + p4;
                    }
                    return result;
                }
            );
        return formattedCPF.slice(0, 14);
    },
    phoneNumber: (text: string): string => {
        if (!text) {
            return '';
        }
        let formattedPhoneNumber: string = text.replace(/\D/g, '');

        formattedPhoneNumber = formattedPhoneNumber.replace(
            /(\d{1,2})(\d{0,5})(\d{0,4})/,
            (match: string, p1: string, p2: string, p3: string) => {
                let result: string = '(' + p1;
                if (p2) {
                    result += ') ' + p2;
                }
                if (p3) {
                    result += '-' + p3;
                }
                return result;
            }
        );
        return formattedPhoneNumber.slice(0, 15);
    }
};

export const format: {
    dateToISO: (date: string) => string;
    dateTimeToISO: (date: string) => string;
    dateToDDMMYYYY: (date: string) => string;
    cpfToDB: (cpf: string) => string;
    phoneNumberToDB: (phone: string) => string;
    getCurrentISOStringTimezone: () => string;
    secondsToTime: (seconds: number) => string;
} = {
    dateToISO: (date: string) => {
        const datePattern: RegExp = /(\d{2})\/(\d{2})\/(\d{4})/;

        const formattedDate: string = date.replace(datePattern, '$3-$2-$1');

        return formattedDate;
    },
    dateTimeToISO: (date: string): string => {
        date = format.dateToISO(date);
        const formattedDate: string = date.split('T')[0];

        return formattedDate;
    },
    dateToDDMMYYYY: (date: string): string => {
        const convertedDate: Date = new Date(date);

        const day: string = convertedDate.getDate().toString().padStart(2, '0');

        const month: string = (convertedDate.getMonth() + 1)
            .toString()
            .padStart(2, '0');

        const year: number = convertedDate.getFullYear();

        return `${day}/${month}/${year}`;
    },
    cpfToDB: (cpf: string) => {
        cpf = cpf.trim();
        return cpf.replace(/[.-]/g, '');
    },
    phoneNumberToDB: (phone: string) => {
        phone = phone.trim();
        return phone.replace(/[()-]/g, '').replace(/\s/g, '');
    },
    getCurrentISOStringTimezone: () => {
        const today: Date = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

        return today.toISOString();
    },
    secondsToTime: (seconds: number) =>
        seconds < 3600
            ? new Date(seconds * 1000).toISOString().substring(14, 19)
            : new Date(seconds * 1000).toISOString().substring(11, 19)
};
