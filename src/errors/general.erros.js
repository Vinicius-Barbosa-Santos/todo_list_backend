const notAllowedFieldsToUpdate = (response) => {
    return response.status(500).send('Um ou mais campos inseridos não são editáveis')
}

module.exports = {
    notAllowedFieldsToUpdate
}