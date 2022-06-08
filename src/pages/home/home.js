import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../../components/post/post";
import "./home.css";
import { getAllPosts } from "../../slices/postSlice";
import { CustomLoader } from "../../components/customLoader/customloader";
import { useLocation } from "react-router";

function Home() {
    const { loggedInUser } = useSelector((state) => state.userReducer);
    const { _id: userId } = loggedInUser;
    const { posts, isLoading } = useSelector((state) => state.postsReducer);
    const location = useLocation();
    const dispatch = useDispatch();

    const [postFilters, setPostFilters] = useState("latest");

    const changePostFilter = (e) => {
        setPostFilters(e.target.id);
    };

    const sortPosts = (posts) => {
        switch (postFilters) {
            case "latest":
                return [...posts].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            case "trending":
                return [...posts].sort(
                    (a, b) => b.likes.likeCount - a.likes.likeCount
                );
            default:
                return posts;
        }
    };

    const filteredPosts =
        location.pathname === "/"
            ? sortPosts(posts).filter(
                  (post) =>
                      post.userId === userId ||
                      loggedInUser.following.some(
                          (followinguser) => post.userId === followinguser._id
                      )
              )
            : sortPosts(posts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    if (isLoading) return <CustomLoader />;

    return (
        <div className="home">
            <div className="chips-container">
                <li
                    id="trending"
                    className={postFilters === "trending" ? "active" : ""}
                    onClick={changePostFilter}
                >
                    Trending
                </li>
                <li
                    id="latest"
                    className={postFilters === "latest" ? "active" : ""}
                    onClick={changePostFilter}
                >
                    Latest
                </li>
            </div>
            <div className="post-container">
                {filteredPosts.length !== 0
                    ? filteredPosts.map((post) => (
                          <Post key={post._id} post={post} />
                      ))
                    : "No post found. Follow other user to see their posts."}
            </div>
        </div>
    );
}

export { Home };
