const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getPictures = async () => {
  const response = await fetch(`${BASE_URL}/data`);
  if (!response.ok) {
    throw new Error('Не удалось загрузить данные');
  }
  return response.json();
};

const sendPicture = async (formData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Не удалось отправить данные');
  }
  return response.json();
};

export { getPictures, sendPicture };
