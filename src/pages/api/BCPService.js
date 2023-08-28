const path = require('path');
const { conexionApiBCP } = require('./BCPCore.js');

class BCPServices {
    constructor() {
        this.certificatePFX =  path.join(process.cwd(), 'src/pages/api/CertificateSandBoxApi.pfx');
        this.passwordPFX = 'Pa$$Bcp2021';
        this.appUserId = 'PRECJUSTOUser29032023';
        this.businessCode = '0261';
        this.publicToken = '6AE52A5E-3A70-4140-9DEE-E9155750A41F';
        this.usuario = 'PRECJUSTO_USER';
        this.passwordUsuario = 'ed6ce73a0234d3b45876abd2494bb53b';
        this.qrV2 = 'https://www99.bancred.com.bo/sandbox/api/v4/Qr';
    }

    consultQr(id, correlationId) {
        const body = {
            "appUserId": this.appUserId,
            "id": id,
            "serviceCode": "050",
            "busnessCode": this.businessCode,
            "publicToken": this.publicToken
        };
        return conexionApiBCP(`${this.qrv3}/Consult`, 'POST', body, correlationId, this.usuario, this.passwordUsuario, this.certificatePFX, this.passwordPFX);
    }

    generatedQr(amount, currency, gloss, collectors, expiration = "1/00:00", correlationId) {
        const body = {
            "appUserId": this.appUserId,
            "currency": currency,
            "amount": amount,
            "gloss": gloss,
            "serviceCode": "050",
            "enableBank": "ALL",
            "businessCode": this.businessCode,
            "collectors": collectors,
            "expiration": expiration,
            "publicToken": this.publicToken,
            "singleUse": "false",
            "City": "La Paz",
            "BranchOffice": "Sucursal 01",
            "Teller": "Caja 1",
            "PhoneNumber": "123456"
        };
        return conexionApiBCP(`${this.qrV2}/Generated`, 'POST', body, correlationId, this.usuario, this.passwordUsuario, this.certificatePFX, this.passwordPFX);
    }

    reportQrDetallado(begin, end, currency, correlationId) {
        const body = {
            "appUserId": this.appUserId,
            "currency": currency,
            "startDate": begin,
            "finDate": end,
            "serviceCode": "050",
            "businessCode": this.businessCode,
            "publicToken": this.publicToken
        };
        return conexionApiBCP(`${this.qrV2}/Report/Detail`, 'POST', body, correlationId, this.usuario, this.passwordUsuario, this.certificatePFX, this.passwordPFX);
    }

    reportQrGeneral(begin, end, currency, correlationId) {
        const body = {
            "appUserId": this.appUserId,
            "currency": currency,
            "startDate": begin,
            "finDate": end,
            "serviceCode": "050",
            "businessCode": this.businessCode,
            "publicToken": this.publicToken,
        };
        return conexionApiBCP(`${this.qrV2}/Report/General`, 'POST', body, correlationId, this.usuario, this.passwordUsuario, this.certificatePFX, this.passwordPFX);
    }

    enlistPayment(idc, extension, amount, currency, gloss, serviceCode, correlationId, expirationDate = '', soliNumber = '', complement = '00') {
        const body = {
            "appUserId": this.appUserId,
            "currency": currency,
            "amount": amount,
            "gloss": gloss,
            "idc": idc,
            "complement": complement,
            "extension": extension,
            "serviceCode": serviceCode, 
            "date": new Date().toISOString().slice(0, 10).replace(/-/g, ''),
            "hour": new Date().toISOString().slice(11, 19).replace(/:/g, ''),
            "businessCode": this.businessCode,
            "solinumber": soliNumber,
            "expirationDate": expirationDate,
            "publicToken": this.publicToken
        };
        return conexionApiBCP(`${this.buttonPay}/Enlist`, 'POST', body, correlationId, this.usuario, this.passwordUsuario, this.certificatePFX, THIS.passwordPFX);
    }

    confirmPayment(authorizationNumber, otp, correlationIdEnlist, serviceCode, correlationId) {
        const body = {
            "appUserId": this.appUserId,
            "authorizationNumber": authorizationNumber,
            "otp": otp,
            "correlationId": correlationIdEnlist,
            "date": new Date().toISOString().slice(0, 10).replace(/-/g, ''),
            "hour": new Date().toISOString().slice(11, 19).replace(/:/g, ''),
            "businessCode": this.businessCode,
            "publicToken": this.publicToken
        };
        return conexionApiBCP(`${this.buttonPay}/Confirm`, 'POST',  body, correlationId, this.usuario, this.passwordUsuario, this.certificatePFX, this.passwordPFX);
    }

    consultPayment(authorizationNumber, opt, correlationIdEnlist, correlationId) {
        const body = {
            "appUserId": this.appUserId,
            "authorizationNumber": authorizationNumber,
            "correlationId": correlationIdEnlist,
            "serviceCode": serviceCode,
            "businessCode": this.businessCode,
            "publicToken": this.publicToken
        };
        return conexionApiBCP(`${this.buttonPay}/Consult`, 'POST', body, correlationId, this.usuario, this.passwordUsuario, this.certificatePFX, this.passwordPFX)
    }
}

module.exports = { BCPServices };