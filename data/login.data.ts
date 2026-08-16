export const loginData = {
  validLogin: {
    email: 'vergi@example.com',
    password: 'passwordVergi1!'
  },

  invalidPassword: {
    email: 'vergi@example.com',
    password: 'Invalid-Password!'
  },

  unregisteredEmail: {
    email: 'unknown@example.com',
    password: 'passwordVergi1!'
  },

  invalidEmailFormat: {
    email: 'invalid-email',
    password: 'passwordVergi1!'
  },

  emptyEmail: {
    email: '',
    password: 'passwordVergi1!'
  },

  emptyPassword: {
    email: 'vergi@example.com',
    password: ''
  },

  emptyEmailAndPassword: {
    email: '',
    password: ''
  },

  missingEmail: {
    password: 'passwordVergi1!'
  },

  missingPassword: {
    email: 'vergi@example.com'
  },

  emptyBody: {}
};