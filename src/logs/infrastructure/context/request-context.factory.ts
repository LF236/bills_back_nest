import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UAParser } from 'ua-parser-js';
import { RequestContextInterface } from './request-context.interface';

@Injectable()
export class RequestContextFactory {

  private getRoute(req: Request) : string {
    const isGql = req.originalUrl === '/graphql';
    if(isGql) {
      return req.body?.operationName ?? 'graphql'
    } else {
      return req.originalUrl
    }
  }

  create(req: Request) : RequestContextInterface {
    if(!req) {
      return {
        ip: null,
        user_agent: null,
        browser: null,
        browser_version: null,
        os: null,
        os_version: null,
        device: null,
        method_http: null,
        route: null,
        request_id: null
      }
    }

    const parser = new UAParser(req.headers['user-agent']);
    const ua = parser.getResult();

    return {
      ip: req.ip ?? null,
      user_agent: req.headers['user-agent'] ?? null,
      browser: ua.browser.name ?? null,
      browser_version: ua.browser.version ?? null,
      os: ua.os.name ?? null,
      os_version: ua.os.version ?? null,
      device: ua.device.type ?? 'Desktop',
      method_http: req.method,
      route: this.getRoute(req),
      request_id: (req.headers['x-request-id'] as string) ?? null,
    }
  }
}