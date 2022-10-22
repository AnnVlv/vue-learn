export class PostAdapterService {
    static adaptAPIPosts(posts) {
        return posts.map(PostAdapterService.adaptAPIPost);
    }

    static adaptAPIPost(post) {
        const {id, title, body} = post;
        return {
            id,
            title,
            content: body,
        };
    }
}
