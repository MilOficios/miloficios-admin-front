export interface EmpresaInterface {
    id?: string;
    ruc?: string;
    activo?: boolean;
    usuarioSol?: string;
    claveSol?: string;
    codigoPais?: string;
    codigoUbigeo?: string;
    direccion?: string;
    departamento?: string;
    provincia?: string;
    distrito?: string;
    razonSocial?: string;
    nombreComercial?: string;
    fechaCreacion?: Date;

    apiKey?: string;
    certificado?: boolean;
}
