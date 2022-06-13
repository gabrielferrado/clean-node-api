import app from '../config/app'
import request from 'supertest'

describe('SignUp Routes', function () {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Gabriel',
        email: 'gabriel.ferreira@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
