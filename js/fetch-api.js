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
  UPLOAD: 'Ошибка отправки формы',
};

function makeApiRequest(route, errorText, method = HttpMethod.GET, body = null) {
  return fetch(`${API_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorText);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });
}

export function fetchPhotos() {
  return makeApiRequest(ApiPath.GET_PHOTOS);
}

export function uploadPhotoData(body) {
  return makeApiRequest(ApiPath.UPLOAD, ErrorMessage.UPLOAD, HttpMethod.POST, body);
}
