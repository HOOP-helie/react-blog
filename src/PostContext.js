import { useState, createContext, useContext } from "react";
import { faker } from "@faker-js/faker";

const PostContext = createContext({});

function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}
const PostContextProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );

    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                `${post.title} ${post.body}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            : posts;

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    return (
        <PostContext.Provider value={{ posts: searchedPosts, onClearPosts: handleClearPosts, searchQuery, setSearchQuery, onAddPost: handleAddPost }}>
            {children}
        </PostContext.Provider>
    )
}

const usePostContext = () => {
    let postContext = useContext(PostContext);
    if (!postContext) {
        console.log("Incorrect use of useContext");
        return
    }
    return postContext

}

export { PostContext, PostContextProvider, createRandomPost, usePostContext }