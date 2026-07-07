export class LogEntity {
  constructor(
    private readonly id: string,
    private readonly user_id: string,
    private readonly user_name: string,
    private readonly action: string,
    private readonly module: string,
    private readonly resource: string,
    private readonly description: string,
    private readonly result: string,
    private readonly message_error: string | null,
    private readonly ip: string | null,
    private readonly user_agent: string | null,
    private readonly method_http: string | null,
    private readonly route: string | null,
    private readonly request_id: string | null,
    private readonly duration: number | null,
    private readonly created_at: Date | null,
    private readonly updated_at: Date | null
  ){};

  static createFromObj(data: any): LogEntity {
    return new LogEntity(
      data.id,
      data.user_id,
      data.user_name,
      data.action,
      data.module,
      data.resource,
      data.description,
      data.result,
      data.message_error ?? null,
      data.ip ?? null,
      data.user_agent ?? null,
      data.method_http ?? null,
      data.route ?? null,
      data.request_id ?? null,
      data.duration ?? null,
      data.created_at ?? null,
      data.updated_at ?? null,
    );
  }
  
}