export class OptionsResponse {
  public success: boolean = false;
  public message: string = "";
  public status: number = 0;
  public results: any = null;

  constructor({ status = 0, message = "", results = null, success = false }: Partial<OptionsResponse>) {
    this.status = status;
    this.message = message;
    this.results = results;
    this.success = success
  }
}