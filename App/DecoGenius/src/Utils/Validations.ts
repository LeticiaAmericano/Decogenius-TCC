// Imports React
import { cpf } from 'cpf-cnpj-validator';
import { format } from './FormattingDataFunctions';

export const cpfValidationFC: (value: string | undefined) => boolean = (
    value: string | undefined
): boolean => {
    if (value) {
        if (!cpf.isValid(value)) {
            return false;
        }
    }
    return true;
};

export const isJson = <T>(item: string): T | null => {
    try {
        return JSON.parse(item);
    } catch (e) {
        return null;
    }
};

export const validateFutureDateOfBirth = (
    value: string | undefined
): boolean => {
    if (!value) return true;
    const cleanValue = value.replace(/\D/g, '');

    const [day, month, year] = [
        cleanValue.slice(0, 2),
        cleanValue.slice(2, 4),
        cleanValue.slice(4, 8)
    ].map(Number);

    const dateOfBirth = new Date(year, month - 1, day);
    const today: Date = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

    today.toISOString();

    return (
        dateOfBirth.toISOString().split('T')[0] <=
        format.getCurrentISOStringTimezone().split('T')[0]
    );
};
