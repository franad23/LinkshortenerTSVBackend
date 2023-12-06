import { prop, getModelForClass } from "@typegoose/typegoose";

class url {
  @prop({ required: true })
  shortedUrl: string;

  @prop({ required: true })
  originalUrl: string;
}

const urlModel = getModelForClass(url);
export default urlModel;