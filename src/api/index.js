
const API_URL= "https://i6l1mlzd0m.execute-api.us-east-2.amazonaws.com/dev"

// Función para obtener datos (GET)
export const getData = async (endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error al obtener los datos de ${endpoint}`);
  }
  const data = await response.json();
  return data;
};

// Función para enviar datos (POST)
export const postData = async (endpoint, body) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Error al enviar los datos a ${endpoint}`);
  }
  const result = await response.json();
  return result;
};

export const putData = async (endpoint, body) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Error al enviar los datos a ${endpoint}`);
  }
  const result = await response.json();
  return result;
};
// Funciones específicas
// export const getProducts = () => fetchData('list_products');
// export const fetchUsers = () => fetchData('users');
// export const fetchComments = () => fetchData('comments');
