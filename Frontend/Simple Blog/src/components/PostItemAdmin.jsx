const PostItem = ({ post, setPosts }) => {
	const localServer = "http://localhost:3000/";

	const deletePost = () => {
		fetch(`${localServer}api/data/${post.id}/delete`, { method: "DELETE" })
			.then((res) => res.json())
			.then(({ success, result, error }) => {
				if (!success) console.log(error);
				else setPosts(result);
			})
			.catch((err) => console.log(err));
	};
	return (
		<article className='postItem'>
			<img
				src={localServer + post.img}
				alt={post.title}
			/>
			<div>
				<h2>{post.title}</h2>
				<p>{post.content}</p>
			</div>
			<span onClick={deletePost}>🗑️</span>
		</article>
	);
};

export default PostItem;
