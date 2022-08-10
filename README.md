Node.js Express + MongoDB(Mongoose)
AuthRoute:
app.post('/auth/registration')
app.post('/auth/login') 
UserRoute:
app.post('/todo/create')
app.patch('/todo/updateMark')
app.patch('/todo/updateItem')
app.delete('/todo/delete')
app.get('/todo/getById/:id')
app.get('/todo/getUserWithFilter')
START: npm run dev
