import { Role } from './'
import { VaccinationStatus } from './vaccinationstatus'
import { VaccineName } from './vaccineName'


export function configureFakeBackend() {
    // array in local storage for user records
    let vaccinationDetails = JSON.parse(localStorage.getItem('users')) || [{ 
        id: 1,
        customerId: '1256',
        socialSecurityNum: '1234',
        dob: '12/12/1996',
        vaccinationStatus: VaccinationStatus.FullyVaccinated,
        vaccineName: VaccineName.Covaxin,
        firstDose: '21/08/2021',
        secondDose: '21/08/2021'
    }];

    // monkey patch fetch to setup fake backend
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                const { method } = opts;
                switch (true) {
                    case url.endsWith('/vaccinationdetails') && method === 'GET':
                        return getUsers();
                    
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function getUsers() {
                return ok(vaccinationDetails);
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

        });
    }
};