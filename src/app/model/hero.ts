export class Hero {
  private parseObject: Parse.Object;
  private ID: number;
  private name: string;

  constructor(parseObject: Parse.Object) {
    this.parseObject = parseObject;
    this.ID = parseObject.get('heroID');
    this.name = parseObject.get('name');
  }

  /** getter */
  public getParseObject(): Parse.Object {
    return this.parseObject;
  }

  public getID(): number {
    return this.ID;
  }

  public getName(): string {
    return this.name;
  }

  /** setter */
  /**
   * setID -
   *
   * @param ID - number
   */
  public setID(ID: number) {
    this.ID = ID;
  }

  /**
   * setName -
   *
   * @param name - string
   */
  public setName(name: string) {
    this.name = name;
  }
}
