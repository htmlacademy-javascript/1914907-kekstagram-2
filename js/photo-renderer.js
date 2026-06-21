export function renderPhotos(photos) {
  const container = document.getElementById('photos-container');

  photos.forEach((photo) => {
    const photoElement = document.createElement('div');
    photoElement.className = 'photo-card';
    photoElement.innerHTML = `
      <h3>${photo.description}</h3>
      <p>${photo.likes} лайков</p>
      <p>${photo.comments.length} комментариев</p>
      <p>${photo.url}</p>
    `;
    container.appendChild(photoElement);
  });
}
