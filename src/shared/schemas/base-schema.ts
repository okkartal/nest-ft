import { Prop } from "@nestjs/mongoose"; 
import { Types } from "mongoose";

export class BaseSchema {
   
    constructor()
    {
        this._id = new Types.ObjectId();
        this.dateCreated = new Date().toLocaleString().replace(',','');
    }

    @Prop()
    _id: Types.ObjectId

    @Prop()
    dateCreated: string  
}
 