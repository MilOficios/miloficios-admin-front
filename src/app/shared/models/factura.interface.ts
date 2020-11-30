import { EmisorInterface } from './emisor.interface';
import { ItemInterface } from './item.interface';
import { ClienteInterface } from './cliente.interface';

export interface FacturaInterface {
    id?: string;
    tipo_operacion?: string;
    total_gravadas?: number;
    total_inafecta?: number;
    total_exoneradas?: number;
    total_gratuitas?: number;
    total_exportacion?: number;
    total_descuento?: number;
    sub_total?: number;
    porcentaje_igv?: number;
    total_igv?: number;
    total_isc?: number;
    total_otr_imp?: number;
    total?: number;
    total_letras?: string;
    nro_guia_remision?: string;
    cod_guia_remision?: string;
    nro_otr_comprobante?: string;
    serie_comprobante?: string;
    numero_comprobante?: string;
    fecha_comprobante?: string;
    fecha_vto_comprobante?: string;
    cod_tipo_documento?: string;
    cod_moneda?: string;
    cliente?: ClienteInterface;
    emisor?: EmisorInterface;
    detalle?: ItemInterface[];

    fechaCreacion?: any;
    sended?: boolean;
    statusCode?: string;
    statusResponse?: string;
    detailResponse?: any;
}
