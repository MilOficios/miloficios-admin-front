import { FormGroup, FormControl} from '@angular/forms';

export function emailValidator(control: any): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}

export function rucValidator(control: any): {[key: string]: any} {
    let ruc = control.value;
    //Es entero?    
    if (!((ruc = Number(ruc)) && ruc % 1 === 0
    	&& rucValido(ruc))) { // Acá se comprueba
            return {invalidRuc: true};
    }
}

function rucValido(ruc) {
    //11 dígitos y empieza en 10,15,16,17 o 20
    if (!(ruc >= 1e10 && ruc < 11e9
       || ruc >= 15e9 && ruc < 18e9
       || ruc >= 2e10 && ruc < 21e9))
        return false;
    
    for (var suma = -(ruc % 10 <2), i = 0; i< 11; i++, ruc = ruc/10 | 0) {
        suma += (ruc % 10) * (i % 7 + (i/7 | 0) + 1);
    }
    return suma % 11 === 0;
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true});
        }
    };
}
