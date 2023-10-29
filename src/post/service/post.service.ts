import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SinglePost, PostDocument } from '../../schemas/post.schema';
import { CreatePostDto, UpdatePostDto } from '../DTO/post.dto';

//posts.service

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<PostDocument>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<SinglePost> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<SinglePost[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<SinglePost> {
    return this.postModel.findById(id).exec();
  }
  async findByDate(date: Date): Promise<SinglePost[]> {
    return this.postModel
      .find({
        createdAt: {
          $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          $lt: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1,
          ),
        },
      })
      .exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<SinglePost> {
    return this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<SinglePost> {
    return this.postModel.findByIdAndRemove(id).exec();
  }

  async deleteAll(): Promise<{ message: string }> {
    await this.postModel.deleteMany({}).exec();
    return { message: 'All posts deleted successfully!' };
  }

  async findCarouselPosts(): Promise<SinglePost[]> {
    return this.postModel.find({ carousel: true }).exec();
  }
  async findSideFeedPosts(): Promise<SinglePost[]> {
    return this.postModel.find({ sideFeed: true }).exec();
  }
  async findFeedPosts(): Promise<SinglePost[]> {
    return this.postModel.find({ feed: true }).exec();
  }

  async findFeaturedPosts(): Promise<SinglePost[]> {
    return this.postModel.find({ featured: true }).exec();
  }

  async findAnalyticsPosts(): Promise<SinglePost[]> {
    return this.postModel.find({ analytics: true }).exec();
  }

  async findArmenianFootballPosts(): Promise<SinglePost[]> {
    return this.postModel.find({ armenianFootball: true }).exec();
  }

  async updateBooleanProperty(
    postId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<SinglePost | null> {
    // Create an object to hold the update values
    const update: any = {};

    // Loop through the properties in the DTO and add them to the update object
    for (const key in updatePostDto) {
      if (typeof updatePostDto[key] === 'boolean') {
        update[key] = updatePostDto[key];
      }
    }

    // Update the post with the specified postId
    const updatedPost = await this.postModel.findByIdAndUpdate(postId, update, {
      new: true,
    });
    return updatedPost;
  }
}
