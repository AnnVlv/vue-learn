export class PostHelperService {
    static sortPosts(posts, sortType) {
        if (!sortType) {
            return posts;
        }

        return [...posts].sort((post1, post2) =>
            post1[sortType].localeCompare(post2[sortType])
        );
    }

    static searchPosts(posts, searchQuery) {
        if (!searchQuery) {
            return posts;
        }

        return posts.filter(p =>
            p.title.trim().toLowerCase().startsWith(searchQuery.trim().toLowerCase())
        );
    }
}
