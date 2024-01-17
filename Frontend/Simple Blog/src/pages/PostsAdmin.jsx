import PostItemAdmin from "../components/PostItemAdmin";

const PostsAdmin = ({ posts, setPosts }) => {
	return (
		<section className='posts'>
			<main>
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
