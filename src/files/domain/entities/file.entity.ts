export class FileEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly extension: string,
    public readonly path: string,
    public readonly type: string,
    public readonly created_at: Date,
    public readonly updated_at: Date,
    public readonly deleted_at: Date | null,
    public url?: string
  ) {};

  static createFromObj(data: any) : FileEntity {
    return new FileEntity(
      data.id,
      data.name,
      data.extension,
      data.path,
      data.type,
      data.created_at,
      data.updated_at,
      data.deleted_at
    );
  }

  getId() : string {
    return this.id;
  }

  setSecureUrl(url: string) {
    this.url = url;
  }
}