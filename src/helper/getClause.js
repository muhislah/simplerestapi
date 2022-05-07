const clause = (search, sort, sortby, page, limit) => {
    const result = {}
    result.search = search ? ` WHERE LOWER(name) LIKE LOWER('%${search}%') ` : ''
    result.sort = sort ? ` ${sort}` : ' ASC'
    result.sortby = sortby ? ` ORDER BY ${sortby}` : ' ORDER BY id'
    result.page = page ? ` OFFSET ${(+page-1)*+limit}` : ''
    result.limit = limit ? ` LIMIT ${+limit}` : ''
    return result
}

module.exports = clause;

