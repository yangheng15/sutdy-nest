import { Injectable } from '@nestjs/common';
import { Post } from '../interface/post.interface';

@Injectable()
export class PostService {
    private readonly posts: Post[] = [];
    
    findAll(): Post[] {
        return this.posts;
    }

    create(post: Post) {
        this.posts.push(post)
    }
}
