export class Transaction{

    constructor(
        public id : number,
        public beneficiaryName : string,
        public date : string,
        public direction : string,
        public amount : number,
        public currency : string,
        public kind : string,
        public mcc : string,
        public description : string,
        public imageUrl : string,
        public catcode : string
        ){

    }

}