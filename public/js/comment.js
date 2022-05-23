const newFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const post_id = event.target.getAttribute('data-id');
        const comment = document.querySelector('#comment-content').value.trim();

        if (comment && post_id) {
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify({ comment, post_id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                document.location.replace(`/posts/${post_id}`);
            } else {
                alert('Failed to create comment');
            }
        }
    }
};

document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);
