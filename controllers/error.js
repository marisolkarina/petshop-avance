exports.get404 = (req, res, next) => {
    res.status(404).render('404', { titulo: 'Pagina No Encontrada', path: ''});
};