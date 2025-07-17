const axios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  defaults: {
    baseURL: '',
    headers: {
      common: {}
    }
  }
};

export default axios;
