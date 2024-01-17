const PostItem = ({ post }) => {
	const localServer = "http://localhost:3000/";

	return (
		<article className='postItem'>
			<img
				src={localServer + post.img}
				alt={post.title}
			/>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
		</article>
	);
};

export default PostItem;
