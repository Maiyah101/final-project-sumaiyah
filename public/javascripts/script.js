let allPosts = [];

window.onload = function() {
  getPosts();

  const form = document.getElementById('postForm');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const imageFile = document.getElementById('petImage').files[0];
    const caption = document.getElementById('caption').value;
    const tag = document.getElementById('tag').value;

    const formData = new FormData();
    formData.append('petImage', imageFile);
    formData.append('caption', caption);
    formData.append('tag', tag);

    await fetch('/entries', {
      method: 'POST',
      body: formData
    });

    form.reset();
    getPosts();
  });
};

async function getPosts() {
  const response = await fetch('/entries');
  allPosts = await response.json();
  showPosts(allPosts);
}

function showPosts(posts) {
  const postsSection = document.getElementById('posts');
  postsSection.innerHTML = '';

  posts.forEach(function(post) {
    let commentsHtml = '';

    post.comments.forEach(function(comment) {
      commentsHtml += `<p class="comment">💬 ${comment}</p>`;
    });

    const card = document.createElement('div');
    card.className = 'pet-card';

    card.innerHTML = `
      <img src="${post.imageUrl}" alt="pet photo">
      <p class="tag">#${post.tag}</p>
      <h3>${post.caption}</h3>

      <button onclick="likePost('${post._id}')">
        🧡 Like ${post.likes}
      </button>

      <div class="comment-box">
        <input type="text" id="comment-${post._id}" placeholder="Leave anonymous comment">
        <button onclick="addComment('${post._id}')">Comment</button>
      </div>

      <div class="comments">
        ${commentsHtml}
      </div>
    `;

    postsSection.appendChild(card);
  });
}

async function likePost(id) {
  await fetch(`/entries/${id}/like`, {
    method: 'PUT'
  });

  getPosts();
}

async function addComment(id) {
  const commentInput = document.getElementById(`comment-${id}`);
  const comment = commentInput.value;

  if (comment.trim() === '') {
    return;
  }

  await fetch(`/entries/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: comment
    })
  });

  getPosts();
}

function filterPosts(tag) {
  if (tag === 'all') {
    showPosts(allPosts);
  } else {
    const filtered = allPosts.filter(function(post) {
      return post.tag === tag;
    });

    showPosts(filtered);
  }
}