const newFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const post_id = event.target.getAttribute('data-id');
        const comment = document.querySelector('#comment-content').value.trim();

        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ post_id, comment }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
};

document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);
