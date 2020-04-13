export class User{
  constructor(
    public email : string,
    public userId : string,
    private _token : string,
    public _expirationDate : Date){}


  public get token() : string {
    if(!this._expirationDate || new Date() > this._expirationDate){
      return null;
    }
    return this._token;
  }

}
