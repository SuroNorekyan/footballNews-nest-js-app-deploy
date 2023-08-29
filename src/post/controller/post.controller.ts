import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { SinglePost } from '../../schemas/post.schema';
import { CreatePostDto, UpdatePostDto } from '../DTO/post.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

//posts.controller

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('date')
  async findAllByDate(
    @Query('date') dateString: string,
  ): Promise<SinglePost[]> {
    const date = new Date(dateString);
    return this.postService.findByDate(date);
  }

  @Get('carousel')
  async findCarouselPosts(
    @Query('carousel') carousel: boolean,
  ): Promise<SinglePost[]> {
    return this.postService.findCarouselPosts();
  }
  @Get('sideFeed')
  async findSideFeedPosts(
    @Query('carousel') carousel: boolean,
  ): Promise<SinglePost[]> {
    return this.postService.findSideFeedPosts();
  }

  @Get('feed')
  async findFeedPosts(
    @Query('carousel') carousel: boolean,
  ): Promise<SinglePost[]> {
    return this.postService.findFeedPosts();
  }

  @Get('featured')
  async findFeaturedPosts(
    @Query('carousel') carousel: boolean,
  ): Promise<SinglePost[]> {
    return this.postService.findFeaturedPosts();
  }

  @Get('analytics')
  async findAnalyticsPosts(
    @Query('carousel') carousel: boolean,
  ): Promise<SinglePost[]> {
    return this.postService.findAnalyticsPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<SinglePost> {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<SinglePost[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SinglePost> {
    return this.postService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<SinglePost> {
    return this.postService.update(id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<SinglePost> {
    return this.postService.remove(id);
  }

  @Delete()
  async deleteAll(): Promise<{ message: string }> {
    const response = await this.postService.deleteAll();
    return { message: response.message };
  }
}
