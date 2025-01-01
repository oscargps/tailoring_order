type NumberDictionary = {
    [key: string]: string;
};

const UNIDADES: NumberDictionary = {
    '0': '',
    '1': 'un',
    '2': 'dos',
    '3': 'tres',
    '4': 'cuatro',
    '5': 'cinco',
    '6': 'seis',
    '7': 'siete',
    '8': 'ocho',
    '9': 'nueve',
};

const DECENAS: NumberDictionary = {
    '1': 'diez',
    '2': 'veinte',
    '3': 'treinta',
    '4': 'cuarenta',
    '5': 'cincuenta',
    '6': 'sesenta',
    '7': 'setenta',
    '8': 'ochenta',
    '9': 'noventa',
};

const ESPECIALES_DIEZ: NumberDictionary = {
    '11': 'once',
    '12': 'doce',
    '13': 'trece',
    '14': 'catorce',
    '15': 'quince',
    '16': 'dieciséis',
    '17': 'diecisiete',
    '18': 'dieciocho',
    '19': 'diecinueve',
};

const CENTENAS: NumberDictionary = {
    '1': 'ciento',
    '2': 'doscientos',
    '3': 'trescientos',
    '4': 'cuatrocientos',
    '5': 'quinientos',
    '6': 'seiscientos',
    '7': 'setecientos',
    '8': 'ochocientos',
    '9': 'novecientos',
};

export function numberToText(number: number): string {
    if (number === 0) return 'cero';
    if (number < 0) return 'menos ' + numberToText(Math.abs(number));

    let texto = '';

    // Función auxiliar para procesar grupos de tres dígitos
    function procesarGrupo(n: number): string {
        if (n === 0) return '';

        let resultado = '';

        // Procesar centenas
        const centenas = Math.floor(n / 100);
        if (centenas > 0) {
            if (n === 100) return 'cien';
            resultado += CENTENAS[centenas.toString()] + ' ';
        }

        // Procesar decenas y unidades
        const decenas = Math.floor((n % 100) / 10);
        const unidades = n % 10;

        if (decenas === 1) {
            if (unidades === 0) {
                resultado += 'diez';
            } else {
                resultado += ESPECIALES_DIEZ[(decenas.toString() + unidades.toString())] || '';
            }
            return resultado.trim();
        }

        if (decenas > 0) {
            resultado += DECENAS[decenas.toString()];
            if (unidades > 0) {
                resultado += decenas === 2 ? ' y ' : ' y ';
            }
        }

        if (unidades > 0) {
            resultado += UNIDADES[unidades.toString()];
        }

        return resultado.trim();
    }

    // Dividir el número en grupos de tres dígitos
    const miles = Math.floor((number % 1000000) / 1000);
    const millones = Math.floor(number / 1000000);
    const unidades = number % 1000;

    // Procesar millones
    if (millones > 0) {
        if (millones === 1) {
            texto += 'un millón ';
        } else {
            texto += procesarGrupo(millones) + ' millones ';
        }
    }

    // Procesar miles
    if (miles > 0) {
        if (miles === 1) {
            texto += 'mil ';
        } else {
            texto += procesarGrupo(miles) + ' mil ';
        }
    }

    // Procesar unidades
    if (unidades > 0) {
        texto += procesarGrupo(unidades);
    }

    return texto.trim();
}