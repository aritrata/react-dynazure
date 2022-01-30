import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { vaccinationdetailService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [vaccinationdetails, setVaccinationdetails] = useState(null);

    useEffect(() => {
        vaccinationdetailService.getAll().then(x => setVaccinationdetails(x));
    }, []);

    function deletevaccinationdetail(id) {
        setVaccinationdetails(vaccinationdetails.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        vaccinationdetailService.delete(id).then(() => {
            setVaccinationdetails(vaccinationdetails => vaccinationdetails.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Vaccination Details</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Details</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Customer Id</th>
                        <th style={{ width: '15%' }}>SSN</th>
                        <th style={{ width: '15%' }}>DOB</th>
                        <th style={{ width: '15%' }}>Vaccination Status</th>
                        <th style={{ width: '15%' }}>Vaccine Name</th>
                        <th style={{ width: '10%' }}>First Dose</th>
                        <th style={{ width: '10%' }}>Second Dose</th>
                    </tr>
                </thead>
                <tbody>
                    {vaccinationdetails && vaccinationdetails.map(vaccinationdetail =>
                        <tr key={vaccinationdetail.id}>
                            <td>{vaccinationdetail.customerId} {vaccinationdetail.socialSecurityNum}</td>
                            <td>{vaccinationdetail.dob} {vaccinationdetail.vaccinationStatus}</td>
                            <td>{vaccinationdetail.vaccineName} {vaccinationdetail.FirstDose} {vaccinationdetail.secondDose}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${vaccinationdetail.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deletevaccinationdetail(vaccinationdetail.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={vaccinationdetail.isDeleting}>
                                    {vaccinationdetail.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!vaccinationdetails &&
                        <tr>
                            <td colSpan="8" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {vaccinationdetails && !vaccinationdetails.length &&
                        <tr>
                            <td colSpan="8" className="text-center">
                                <div className="p-2">No vaccinationdetails To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };