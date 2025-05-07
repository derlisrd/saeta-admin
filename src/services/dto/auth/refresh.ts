export class RefreshTokenResponse {
  public success: boolean = false
  public results: RefreshTokenResults | null = null
  public status: number = 0
  public message: string = ''

  constructor({ success, results, status, message }: { success: boolean, results: RefreshTokenResults | null, status: number, message: string }) {
    this.success = success;
    this.results = results;
    this.status = status;
    this.message = message;
  }

  static fromJSON(data: any): RefreshTokenResponse {
    return new RefreshTokenResponse({
      success: data.success,
      results: data.results == null ? null : RefreshTokenResults.fromJSON(data.results),
      status: data.status,
      message: data.message
    });
  }

}

export class RefreshTokenResults {
    public tokenRaw: string = '';
    public token: string = '';
    public refreshToken: string = '';

    constructor({tokenRaw, token, refreshToken}: {tokenRaw: string, token: string, refreshToken: string}) {
      this.tokenRaw = tokenRaw
      this.token = token
      this.refreshToken = refreshToken
    }
    static fromJSON(data: any): RefreshTokenResults {
      return new RefreshTokenResults({
        tokenRaw: data.tokenRaw,
        token: data.token,
        refreshToken: data.refresh_token
      });
    }
}