const API_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ApiPath = {
  GET_PHOTOS: '/data',
  UPLOAD: '/',
};

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessage = {
  LOAD: 'Ошибка загрузки данных',
  UPLOAD: 'Ошибка отправки формы',
};

const makeApiRequest = (route, errorText, method = HttpMethod.GET, body = null) =>
  fetch(`${API_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

export const fetchPhotos = () => makeApiRequest(ApiPath.GET_PHOTOS, ErrorMessage.LOAD);

export const uploadPhotoData = (body) => makeApiRequest(ApiPath.UPLOAD, ErrorMessage.UPLOAD, HttpMethod.POST, body);
