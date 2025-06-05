import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { getPosts } from "../../../api/PostsApi";

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lấy danh sách bài viết
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const data = await getPosts();
                setPosts(Array.isArray(data.data) ? data.data : []);
            } catch (err) {
                setPosts([]);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

    return (
        <>
            <Header />
            <div className="w-full bg-[#f7f7f7] min-h-screen pb-10">
                <div className="w-[75%] mx-auto px-6 py-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 mb-6">
                        <Link to="/" className="hover:text-red-600 text-xl">Trang chủ</Link>
                        <ArrowRightIcon />
                        <span className="text-red-600 text-xl">Bài viết</span>
                    </nav>

                    {/* Danh sách bài viết */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {loading ? (
                            <div className="col-span-full text-center py-10">Đang tải bài viết...</div>
                        ) : posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post._id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col">
                                    <Link to={`/posts/${post.slug}`}>
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="w-full h-44 object-cover rounded mb-2"
                                        />
                                    </Link>
                                    <div className="flex-1 flex flex-col">
                                        <Link to={`/posts/${post.slug}`}>
                                            <h3 className="font-semibold text-base mb-1 line-clamp-2 hover:text-red-600 transition">{post.title}</h3>
                                        </Link>
                                        <div className="text-sm text-gray-500 mb-2 line-clamp-3">{post.description}</div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-xs text-gray-400">{new Date(post.created_at).toLocaleDateString()}</span>
                                            <Link
                                                to={`/posts/${post.slug}`}
                                                className="text-red-600 text-sm hover:underline"
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10">Không có bài viết nào.</div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PostsList;