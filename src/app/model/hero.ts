/** Hero - 英雄物件 */
export class Hero {
  private parseObject: Parse.Object;
  private ID: string;
  private name: string;

  constructor(parseObject: Parse.Object) {
    this.parseObject = parseObject;
    this.ID = parseObject.id;
    this.name = parseObject.get('name');
  }

  /** getter */
  public getParseObject(): Parse.Object {
    return this.parseObject;
  }

  public getID(): string {
    return this.ID;
  }

  public getName(): string {
    return this.name;
  }

  /** setter */
  /**
   * setName -
   *
   * @param name - string
   */
  public setName(name: string) {
    this.name = name;
  }
}
