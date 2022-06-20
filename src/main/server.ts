import 'dotenv/config'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    const server = app.listen(
      env.port,
      () => console.log(`Server started on http://localhost:${env.port}`)
    )
    server.keepAliveTimeout = 65000
    server.headersTimeout = 66000
  })
  .catch(e => (console.error({ error: e.message, updatedAt: new Date().toUTCString() })))
