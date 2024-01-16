import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  validateCpf(cpf: string): boolean {
        cpf = cpf.replace(/[^\d]/g, '');
    
        if (cpf.length !== 11) {
          return false; 
        }

        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += parseInt(cpf[i]) * (10 - i);
        }
    
        let remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) {
          remainder = 0;
        }
    
        if (remainder !== parseInt(cpf[9])) {
          return false;
        }
    
        sum = 0;
        for (let i = 0; i < 10; i++) {
          sum += parseInt(cpf[i]) * (11 - i);
        }
    
        remainder = 11 - (sum % 11);
        if (remainder === 10 || remainder === 11) {
          remainder = 0;
        }
    
        return remainder === parseInt(cpf[10]);
  };

  validateCnpj(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]/g, '');

    if (cnpj.length !== 14) {
      return false;
    }

    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }

    let remainder = sum % 11;
    const firstDigit = remainder < 2 ? 0 : 11 - remainder;

    if (firstDigit !== parseInt(cnpj[12])) {
      return false;
    }

    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj[i]) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }

    remainder = sum % 11;
    const secondDigit = remainder < 2 ? 0 : 11 - remainder;

    return secondDigit === parseInt(cnpj[13]);
  }
}
