const webServer = require('./test1');

const app = new webServer();
const PORT = 3001;

app.use(ctx => {
    ctx.use.write('<p>line 1</p>')
})

app.use(ctx => {
    ctx.use.write('<p>line 2</p>')
})

app.use(ctx => {
    ctx.use.write('<p>line 3</p>')
})

app.listen(PORT, () => {
    console.log(`the web server is starting at port ${PORT}`);
})