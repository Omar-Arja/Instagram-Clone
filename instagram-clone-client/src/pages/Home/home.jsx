import PostFeed from "../../components/post-feed"
import Search from "../../components/search"
import Sidebar from "../../components/sidebar"
import "./style.css"


const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <PostFeed />
        </div>
    )
}

export default Home;