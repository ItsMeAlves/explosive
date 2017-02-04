module.exports = function(app, io) {
    app.get('/', (request, response) => {
        response.render('index');
    });
}