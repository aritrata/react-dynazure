import config from 'config';
import { fetchWrapper } from '@/_helpers';

const baseUrl = `${config.apiUrl}/VaccinationDetail`;

export const vaccinationdetailService = {
    getAll,
    getBySSN,
    create,
    update,
    delete: _delete
};

function getAll() {
    console.log("Hello");
    return fetchWrapper.get(baseUrl);
}

function getBySSN(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
