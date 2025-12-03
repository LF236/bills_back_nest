export class Person {
  constructor(
    private readonly id: string,
    private readonly first_name: string,
    private readonly last_name: string,
    private readonly second_last_name: string | null,
    private readonly sex: string,
    private readonly birh_date: Date,
    private readonly curp: string | null,
    private readonly rfc: string | null,
    private readonly created_at: Date,
    private readonly updated_at: Date,
    private readonly deleted_at: Date | null = null,
  ) {};

  static createFromObj(data : any) : Person {
    let parseDate = new Date(data.birth_date);
    const person = new Person(
      data.id,
      data.first_name,
      data.last_name,
      data.second_last_name ?? null,
      data.sex,
      parseDate,
      data.curp ?? null,
      data.rfc ?? null,
      data.created_at,
      data.updated_at,
      data.deleted_at ?? null,
    );
    return person;
  }
}