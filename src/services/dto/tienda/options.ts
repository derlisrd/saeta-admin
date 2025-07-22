export class OptionsResponse {
  public success: boolean = false;
  public message: string = "";
  public status: number = 0;
  public results: OptionsResults[] = [];

  constructor({ status = 0, message = "", results = [], success = false }: Partial<OptionsResponse>) {
    this.status = status;
    this.message = message;
    this.results = results;
    this.success = success;
  }
}

export class OptionsResults {
  //public id: number = 0;
  public key: string = "";
  public value: string = "";
  public json: number = 0;

  constructor({ key = "", value = "", json = 0 }: Partial<OptionsResults>) {
    this.key = key;
    this.value = value;
    this.json = json;
  }

}