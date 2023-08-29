import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//posts.schema.ts
export type PostDocument = SinglePost & Document;

@Schema({ timestamps: true })
export class SinglePost {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: String, required: true })
  img: string;

  @Prop({ type: String, required: false })
  videoUrl: string;

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ type: Boolean, default: false })
  carousel: boolean;

  @Prop({ type: Boolean, default: false })
  sideFeed: boolean;

  @Prop({ type: Boolean, default: false })
  feed: boolean;

  @Prop({ type: Boolean, default: false })
  featured: boolean;

  @Prop({ type: Boolean, default: false })
  analytics: boolean;
}

export const PostSchema = SchemaFactory.createForClass(SinglePost);
