// /pages/api/validate-emails.js

import validator from 'validator';
import dns from 'dns';
import emailExistence from 'email-existence';
import logger from '@utils/logger';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { emails } = req.body;

    if (!emails || !Array.isArray(emails)) {
      logger.warn('Solicitud inválida: Se requiere un arreglo de correos electrónicos.');
      res.status(400).json({ message: 'Se requiere un arreglo de correos electrónicos.' });
      return;
    }

    const results = [];

    for (const email of emails) {
      try {
        logger.info(`Iniciando validación para el correo: ${email}`);
        const isValidSyntax = validator.isEmail(email);

        if (!isValidSyntax) {
          logger.info(`Correo con sintaxis inválida: ${email}`);
          results.push({
            id: email,
            email,
            valid: false,
            reason: 'Sintaxis inválida',
            code: 'INVALID_SYNTAX',
          });
          continue;
        }

        // Obtener el dominio del correo
        const domain = email.split('@')[1];

        // Verificar registros MX
        logger.debug(`Verificando registros MX para el dominio: ${domain}`);
        const hasMxRecords = await new Promise((resolve) => {
          dns.resolveMx(domain, (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
              logger.warn(`No se encontraron registros MX para el dominio: ${domain}`);
              resolve(false);
            } else {
              logger.debug(`Registros MX encontrados para ${domain}: ${JSON.stringify(addresses)}`);
              resolve(true);
            }
          });
        });

        if (!hasMxRecords) {
          logger.warn(`Dominio sin registros MX: ${domain}`);
          results.push({
            id: email,
            email,
            valid: false,
            reason: 'Dominio sin registros MX',
            code: 'NO_MX_RECORDS',
          });
          continue;
        }

        // Verificar existencia del correo mediante SMTP utilizando `email-existence`
        logger.info(`Intentando verificar el correo mediante SMTP: ${email}`);
        const exists = await new Promise((resolve) => {
          emailExistence.check(email, (error, response) => {
            if (error) {
              logger.error(`Error al verificar ${email}: ${error.message}`);
              resolve(false);
            } else {
              // La biblioteca `email-existence` devuelve `true` o `false`
              resolve(response);
            }
          });
        });

        if (exists) {
          logger.info(`Correo válido y existente: ${email}`);
          results.push({
            id: email,
            email,
            valid: true,
            reason: 'Dirección de correo válida y existente',
            code: 'VALID_EXISTENT',
          });
        } else {
          logger.info(`Correo no existente o no válido: ${email}`);
          results.push({
            id: email,
            email,
            valid: false,
            reason: 'Dirección de correo no existe o no es válida',
            code: 'EMAIL_NOT_EXIST',
          });
        }
      } catch (error) {
        logger.error(`Error al validar el correo ${email}: ${error.message}`);
        results.push({
          id: email,
          email,
          valid: false,
          reason: 'Error en la validación',
          code: 'VALIDATION_ERROR',
        });
      }
    }

    res.status(200).json({ results });
  } else {
    logger.warn(`Método no permitido: ${req.method}`);
    res.status(405).json({ message: 'Método no permitido' });
  }
}
