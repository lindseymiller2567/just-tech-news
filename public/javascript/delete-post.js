async function deleteFormHandler(event) {
  event.preventDefault();

  // console.log(window.location.toString().split('/')[window.location.toString().split('/').length - 1]);

  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  console.log(id)

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);