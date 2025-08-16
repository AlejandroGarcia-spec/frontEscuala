// src/app/core/services/jwt-qr.service.ts
import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';

export interface QRPayload {
  estudiante: {
    id: number;
    nombre: string;
    grado: string;
  };
  autorizadoRecoger: {
    id?: number;
    nombre: string;
    apellido: string;
    tipo: 'tutor' | 'familiar';
    parentesco: string;
  };
  codigoUnico: string;
  iat?: number; // Issued at (automático)
  exp?: number; // Expires at (automático)
}

export interface ValidacionQR {
  valido: boolean;
  mensaje: string;
  datos?: {
    estudiante: string;
    autorizado: string;
    parentesco: string;
    tiempoRestante: string;
    codigoUnico: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class JwtQrService {
  
  // En producción, esta clave debe estar en variables de entorno
  private readonly SECRET_KEY = 'tu-clave-secreta-super-segura-para-qr-2024';
  
  constructor() { }

  /**
   * Genera un token JWT con los datos del QR
   * @param payload Datos a incluir en el token
   * @param horasExpiracion Horas hasta que expire (por defecto 24)
   * @returns Token JWT
   */
  generarToken(payload: QRPayload, horasExpiracion: number = 24): string {
    try {
      const token = jwt.sign(
        payload,
        this.SECRET_KEY,
        {
          expiresIn: `${horasExpiracion}h`,
          issuer: 'escuela-qr-system',
          audience: 'maestros-app'
        }
      );
      
      return token;
    } catch (error) {
      console.error('Error generando token JWT:', error);
      throw new Error('No se pudo generar el token de acceso');
    }
  }

  /**
   * Valida un token JWT escaneado
   * @param token Token a validar
   * @returns Resultado de la validación
   */
  validarToken(token: string): ValidacionQR {
    try {
      // Verificar y decodificar el token
      const datosDecodificados = jwt.verify(token, this.SECRET_KEY, {
        issuer: 'escuela-qr-system',
        audience: 'maestros-app'
      }) as QRPayload & jwt.JwtPayload;

      // Calcular tiempo restante
      const tiempoRestante = this.calcularTiempoRestante(datosDecodificados.exp!);

      return {
        valido: true,
        mensaje: 'QR válido - Acceso autorizado',
        datos: {
          estudiante: datosDecodificados.estudiante.nombre,
          autorizado: `${datosDecodificados.autorizadoRecoger.nombre} ${datosDecodificados.autorizadoRecoger.apellido}`,
          parentesco: datosDecodificados.autorizadoRecoger.parentesco,
          tiempoRestante: tiempoRestante,
          codigoUnico: datosDecodificados.codigoUnico
        }
      };

    } catch (error: any) {
      
      // Manejar diferentes tipos de errores JWT
      if (error.name === 'TokenExpiredError') {
        const tiempoExpirado = this.calcularTiempoExpirado(error.expiredAt);
        return {
          valido: false,
          mensaje: `QR expirado ${tiempoExpirado}. Solicite un nuevo código al tutor.`
        };
      }
      
      if (error.name === 'JsonWebTokenError') {
        return {
          valido: false,
          mensaje: 'QR inválido o corrupto. Verifique el código.'
        };
      }

      if (error.name === 'NotBeforeError') {
        return {
          valido: false,
          mensaje: 'QR aún no es válido.'
        };
      }

      console.error('Error validando token JWT:', error);
      return {
        valido: false,
        mensaje: 'Error al validar QR. Contacte al administrador.'
      };
    }
  }

  /**
   * Decodifica un token sin validarlo (para debugging)
   * @param token Token a decodificar
   * @returns Payload decodificado o null
   */
  decodificarToken(token: string): QRPayload | null {
    try {
      const decoded = jwt.decode(token) as QRPayload;
      return decoded;
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  }

  /**
   * Verifica si un token ha expirado sin validar la firma
   * @param token Token a verificar
   * @returns true si ha expirado
   */
  haExpirado(token: string): boolean {
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      if (!decoded || !decoded.exp) return true;
      
      const ahora = Math.floor(Date.now() / 1000);
      return decoded.exp < ahora;
    } catch (error) {
      return true;
    }
  }

  /**
   * Calcula el tiempo restante hasta la expiración
   * @param exp Timestamp de expiración
   * @returns String con tiempo restante
   */
  private calcularTiempoRestante(exp: number): string {
    const ahora = Math.floor(Date.now() / 1000);
    const segundosRestantes = exp - ahora;
    
    if (segundosRestantes <= 0) return 'Expirado';
    
    const horas = Math.floor(segundosRestantes / 3600);
    const minutos = Math.floor((segundosRestantes % 3600) / 60);
    
    if (horas > 0) {
      return `${horas}h ${minutos}m restantes`;
    } else {
      return `${minutos}m restantes`;
    }
  }

  /**
   * Calcula cuánto tiempo hace que expiró un token
   * @param expiredAt Fecha de expiración
   * @returns String con tiempo expirado
   */
  private calcularTiempoExpirado(expiredAt: Date): string {
    const ahora = new Date();
    const diferenciMs = ahora.getTime() - expiredAt.getTime();
    
    const minutos = Math.floor(diferenciMs / (1000 * 60));
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return `hace ${dias} día${dias > 1 ? 's' : ''}`;
    } else if (horas > 0) {
      return `hace ${horas} hora${horas > 1 ? 's' : ''}`;
    } else {
      return `hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    }
  }
}