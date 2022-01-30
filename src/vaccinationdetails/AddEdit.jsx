import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { vaccinationdetailService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        customerId: Yup.string()
            .required('Customer Id is required'),
        socialSecurityNum: Yup.string()
            .required('SSN is required')
            .min(6, 'SSN must be at least 6 characters'),
        dob: Yup.date()
            .required('DOB is required'),
        vaccinationStatus: Yup.string()
            .required('Vaccination Status is required'),
        vaccineName: Yup.string()
            .required('Vaccine Name is required'),
        firstDose: Yup.date(),
        secondDose: Yup.date()
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createVaccinationDetail(data)
            : updateVaccinationDetail(id, data);
    }

    function createVaccinationDetail(data) {
        return vaccinationdetailService.create(data)
            .then(() => {
                alertService.success('Vaccination Details added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateVaccinationDetail(id, data) {
        return vaccinationdetailService.update(id, data)
            .then(() => {
                alertService.success('Vaccination Details updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            vaccinationdetailService.getBySSN(id).then(vaccinationdetail => {
                const fields = ['Customer Id', 'Social Security Number', 'DOB', 'Vaccination Status', 'Vaccination Name', 'First Dose','Second Dose'];
                fields.forEach(field => setValue(field, vaccinationdetail[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Vaccination Details' : 'Edit Vaccination Details'}</h1>
            <div className="form-row">
                <div className="form-group col">
                    <label>Customer Id</label>
                    <input name="customerId" type="text" ref={register} className={`form-control ${errors.customerId ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Social Security Number</label>
                    <input name="socialSecurityNum" type="text" ref={register} className={`form-control ${errors.socialSecurityNum ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.socialSecurityNum?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label>Date Of Birth</label>
                    <input name="dob" type="Date" ref={register} className={`form-control ${errors.dob ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.dob?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Vaccination Status</label>
                    <select name="vaccinationStatus" ref={register} className={`form-control ${errors.vaccinationStatus ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="FullyVaccinated">FullyVaccinated</option>
                        <option value="PartiallyVaccinated">PartiallyVaccinated</option>
                    </select>
                    <div className="invalid-feedback">{errors.vaccinationStatus?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col">
                    <label>Vaccine Name</label>
                    <select name="vaccineName" ref={register} className={`form-control ${errors.vaccineName ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Covaxin">Covaxin</option>
                        <option value="Covishield">Covishield</option>
                        <option value="ZyCovD">Covaxin</option>
                        <option value="SputnikV">SputnikV</option>
                    </select>
                    <div className="invalid-feedback">{errors.vaccineName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>First Dose</label>
                    <input name="FirstDose" type="Date" ref={register} className={`form-control ${errors.FirstDose ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.FirstDose?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Second Dose</label>
                    <input name="secondDose" type="Date" ref={register} className={`form-control ${errors.secondDose ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.secondDose?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };