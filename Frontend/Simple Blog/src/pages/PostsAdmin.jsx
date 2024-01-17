import PostItemAdmin from "../components/PostItemAdmin";

const PostsAdmin = ({ posts, setPosts }) => {
	return (
		<section className='posts'>
			<main>
				<h1>posts</h1>
				{posts.map((post) => (
					<PostItemAdmin
						post={post}
						key={post.id}
						setPosts={setPosts}
					/>
				))}
			</main>
		</section>
	);
};

export default PostsAdmin;
