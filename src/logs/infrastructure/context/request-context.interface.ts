export interface RequestContextInterface {
  ip: string | null;
  user_agent: string | null;
  
  browser: string | null;
  browser_version: string | null;
  os: string | null;
  os_version: string | null;
  device: string | null;

  method_http: string | null;
  route: string | null;
  request_id: string | null;
}