import { Component, OnInit } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
declare var initData: any;
@Component({
  selector: 'app-button-plux',
  imports: [NgIf],
  templateUrl: './button-plux.component.html',
  styleUrl: './button-plux.component.scss'
})
export class ButtonPluxComponent implements OnInit {
  mostrandoLoader = false;
  constructor(@Inject(PLATFORM_ID) private platformId: any) { }
  data = {
    /* Requerido. Email del establecimiento o Id/Class del elemento html
    que posee el valor*/
    PayboxRemail: "dmorales@pagoplux.com",
    /* Opcional. Email del usuario que realiza el pago o Id/Class del
    elemento html que posee el valor */
    PayboxSendmail: "dmorales@pagoplux.com",
    /* Rquerido. Nombre del usuario/cuenta PagoPlux o Id/Class del
    elemento html que posee el valor */
    PayboxRename: "Brando Cevallos",
    /* Opcional. nombre de persona que realiza el pago o Id/Class del
    elemento html */
    PayboxSendname: "Brando Cevallos",
    /* Requerido. Valor Base 0. Valor que no incluye impuesto */
    PayboxBase0: "2.0",
    /* Requerido. Valor Base 12. Valor que si incluye impuesto */
    PayboxBase12: "10.0",
    /* Requerido. Descripcion del pago o Id/Class del elemento html que
    posee el valor */
    PayboxDescription: "Prueba PagoPlux",
    /* Opcional. Lenguaje del Paybox
* Español: es | (string) (Paybox en español)
* Ingles: us | (string) (Paybox en Ingles)
*/
    PayboxLanguage: "es",
    /*
    * Requerido. direccion del pago
    */
    PayboxDirection: "Latacunga",
    /*
    * Requerido. Teléfono del cliente.
    */
    PayBoxClientPhone: '0984086761',
    /**
    * True -> produccion
    * False -> test
    */
    PayboxProduction: false,
    // ===============================LOS SIGUIENTES PARAMETROS SOLO SE
    // USA EN PAGOS RECURRENTES============================================
    /*
    * True -> en caso de realizar un pago recurrente almacena datos
    tarjeta
    * False -> si es pago normal
    */
    PayboxRecurrent: true,
    /**
    * Id o nombre del plan registrado en el comercio en la plataforma de
    pagoplux (el nombre debe ser exacto)
    */
    PayboxIdPlan: '171',
    /**
    * true -> los cobros se realizan de manera automatica segun la
    frecuencia del plan asignado en PAGOPLUX
    * false -> los cobros se realizan mediante solicitud
    */
    PayboxPermitirCalendarizar: true,
    /**
    * true -> El débito se realiza en el momento del pago
    * false -> El débito se realizará en la fecha de corte según el plan
    contratado
    */
    PayboxPagoInmediato: true,
    /**
    * true -> si desea realizar un pago de prueba de 1$ y reverso del
    mismo de manera automática
    * nota: PayboxPagoImediato debe ser igual false
    * false -> no se realizara ningún cobro de prueba
    */
    PayboxCobroPrueba: false,


    /**
    * Valor de identificación de tarjetahabiente
    */
    PayBoxClientIdentification: 'Cedula tarjetahabiente',
    /**
    * Entorno de ejecución del botón de pagos valores: prod (ambiente
    de producción), sandbox (ambiente de pruebas)
    */
    //<----ESTAS VARIABLES SE USAN PARA PAGOS RECURRENTES CON MONTO VARIABLES ---->
    PayboxAmountVariablePlan: true,
    /**
    * Frecuencia del plan
    "SEM" SEMANAL
    "MEN" MENSUAL
    "BME" BIMESTRAL
    "TME" TRIMESTRAL
    "SME" SEMESTRAL
    "ANU" ANUAL
    */
    PayboxFrequencyPlan: 'MEN',
    /**
    * true ->tiene iva
    * false ->no tiene iva
    */
    PayboxTieneIvaPlan: true,
    /**
    * La descripción del plan, no debe superar los 200 caracteres.
    */
    PayboxDescriptionPlan: 'Descripcion plan',
    /**
    PayboxEnvironment: 'sandbox',
    /**
    * Se usa en TRUE cuando se necesita enlazar el paybox a un botón ya
    existente en el sitio del cliente, caso contrario FALSE o NULL
    * */
    PayboxPagoPlux: true,
    /**
    * Identificador del botón o elemento en el comercio del cliente
    * */
    PayboxIdElement: 'idElementoTest',

    onAuthorize: (response: any) => {
      this.mostrandoLoader = true;
      if (response.status == 'succeeded') {
        this.mostrandoLoader = false;
        //jQuery('.container-unpayed').hide(); // Oculta la respuesta solo en Produccion

        response.amount; // Monto
        response.deferred; // Diferidos
        response.interest; // Tiene intereses
        response.interestValue; // Monto intereses
        response.amountWoTaxes; // Monto impuestos
        response.cardInfo; // Número de tarjeta encriptado
        response.cardIssuer; // Marca tarjeta Ejemplo: Visa
        response.cardType; // Tipo tarjeta Ejemplo: Crédito
        response.clientID; // Identificación tarjetahabiente
        response.clientName; // Nombre tarjetahabiente
        response.fecha; // Fecha de pago
        response.id_transaccion; // ID de transacción PagoPlux
        response.state; // Estado del pago
        response.token; // Voucher del pago
        response.tipoPago; // Tipo de pago usado
//e6f64a75-7a45-454d-a08a-73a71aa7d789
        console.log(response);
      }
    }

  }

  ngOnInit(): void {
    
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (typeof initData === 'function') {
          initData(this.data);
        } else {
          console.error('initData sigue sin estar definido después del timeout');
        }
      }, 500);
    }
  }

}
