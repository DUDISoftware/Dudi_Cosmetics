import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { ArrowRightIcon } from "lucide-react";
import { getPosts, getPostById } from "../../../api/PostsApi";
import { getPostsCategoryById } from "../../../api/PostsCategoryApi";

const PostsDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                // Lấy danh sách bài viết
                const allPosts = await getPosts();
                const found = allPosts?.data?.find((p) => p.slug === slug);
                if (found && found._id) {
                    // Lấy chi tiết bài viết theo id
                    const detailRes = await getPostById(found._id);
                    if (detailRes && detailRes.data) {
                        setPost(detailRes.data);
                        // Lấy thông tin danh mục nếu có
                        if (detailRes.data.CategoryP_id) {
                            const catRes = await getPostsCategoryById(detailRes.data.CategoryP_id);
                            setCategory(catRes?.data || null);
                        } else {
                            setCategory(null);
                        }
                    } else {
                        setPost(null);
                        setCategory(null);
                    }
                } else {
                    setPost(null);
                    setCategory(null);
                }
            } catch (err) {
                setPost(null);
                setCategory(null);
            }
            setLoading(false);
        };
        if (slug) fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="w-full min-h-screen flex items-center justify-center bg-[#f7f7f7]">
                    <div className="text-lg">Đang tải chi tiết bài viết...</div>
                </div>
                <Footer />
            </>
        );
    }

    if (!post) {
        return (
            <>
                <Header />
                <div className="w-full min-h-screen flex items-center justify-center bg-[#f7f7f7]">
                    <div className="text-lg text-red-600">Không tìm thấy bài viết.</div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="w-full bg-[#f7f7f7] min-h-screen pb-10">
                <div className="w-[75%] mx-auto px-6 py-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 mb-6">
                        <Link to="/" className="hover:text-red-600 text-xl">Trang chủ</Link>
                        <ArrowRightIcon />
                        <Link to="/posts" className="hover:text-red-600 text-xl">Bài viết</Link>
                        <ArrowRightIcon />
                        <span className="text-red-600 text-xl">{post.title}</span>
                    </nav>

                    {/* Chi tiết bài viết */}
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8">
                        {/* Ảnh bài viết */}
                        <div className="flex flex-col gap-4 md:w-1/2">
                            <div className="w-full aspect-video bg-gray-50 rounded-lg flex items-center justify-center border">
                                <img
                                    src={post.image_url}
                                    alt={post.title}
                                    className="max-h-[350px] object-contain"
                                />
                            </div>
                        </div>

                        {/* Thông tin bài viết */}
                        <div className="flex-1 flex flex-col gap-4">
                            <h1 className="text-2xl font-bold mb-2 text-red-600">{post.title}</h1>
                            <div className="flex items-center gap-4 mb-2 text-gray-500 text-sm">
                                <span>Ngày đăng: {post.created_at ? new Date(post.created_at).toLocaleDateString() : ""}</span>
                                {category && (
                                    <span>
                                        Danh mục: <span className="text-gray-700">{category.category_name || category.title}</span>
                                    </span>
                                )}
                            </div>
                            <div className="text-base text-gray-700 mb-2">{post.description}</div>
                            <div className="prose max-w-none mb-2" dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PostsDetail;