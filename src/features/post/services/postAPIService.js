import axios from 'axios';

const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';

export class PostAPIService {
    static async getPosts({ limit = 5, page = 1 }) {
        return await axios.get(POSTS_API_URL, {
            params: {
                _limit: limit,
                _page: page,
            },
        });
    }
}
