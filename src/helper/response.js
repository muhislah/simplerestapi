const errorCode = require ('./errorSql')

module.exports.okGet = (data) => {
    const response = {}
    response.status = 200
    response.message = 'GET DATA SUCCESS' 
    response.total_data = data.length
    response.data = data
    return response 
}

module.exports.okGetDetail= (data, id) => {
    const response = {}
    response.status = 200
    response.message = data.length > 0 ? 'GET DETAIL DATA SUCCESS' : 'NO DATA WITH THAT ID';
    response.data_id = id
    response.data = data.length > 0 ? data : undefined
    return response 
}

module.exports.okSearch = (data , key) => {
    const response = {}
    response.status = 200
    response.message = data.length > 0 ? 'GET DATA SUCCESS ' : 'DATA NOT FOUND'
    response.search_key = key
    response.total_data = data.length
    response.data = data
    return response 
}

module.exports.okPagination = (data, page, limit, count) => {
    const response = {}
    response.status = 200
    response.message = 'Pagination Detail'
    response.total_data = count
    response.total_page = Math.floor(count / limit)
    response.page = page
    response.limit = limit
    response.data = data
    return response 
}

module.exports.okInsert = (data) => {
    const response = {}
    response.status = 200
    response.message = `INSERT DATA SUCCES`
    response.data = data
    return response 
}

module.exports.okUpdate = (id) => {
    const response = {}
    response.status = 200
    response.message = `UPDATE DATA SUCCESS ON ID = ${id}` 
    return response 
}

module.exports.okDelete = (id) => {
    const response = {}
    response.status = 200
    response.message = `DELETE DATA SUCCESS ON ID = ${id}`
    return response 
}

module.exports.error = (code) => {
    const response = {}
    response.status = 200
    response.message = `THERE IS ERROR`
    response.detail_message = errorCode[code]
    return response
}
