export interface HttpGood<T>{
    message: string;
    dato: T;
    created?: boolean;
    updated?:boolean;
    deleated?:boolean;
  }