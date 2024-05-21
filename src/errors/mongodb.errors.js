const notFoundError = (response) => {
    return response.status(404).send('Este Dado não foi encontrado no banco de dados.')
}

const objectIdCastError = (response) => {
    return response.status(500).send('Ocorreu um erro ao recuperar este dado no banco de dados.')
}

module.exports = {
    notFoundError,
    objectIdCastError
}