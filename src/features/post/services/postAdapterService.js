export class PostAdapterService {
    static adaptAPIPosts(posts) {
        return posts.map(post => {
            const {id, title, body} = post;
            return {
                id,
                title,
                content: body,
            };
        });
    }
}
