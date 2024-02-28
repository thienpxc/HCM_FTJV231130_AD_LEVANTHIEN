import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { categoryAction } from "../../store/slice/staff.slice";

const AddForm = ({ closeAdd }) => {
  const dispatch = useDispatch();
  

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Họ và tên không được để trống"),
    Date: Yup.date().required("Ngày sinh không được để trống"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    address: Yup.string().required("Địa chỉ không được để trống"),
  });

  const handleSubmit = async (values) => {
    try {
      await axios.post("http://localhost:3000/staff", values);
      dispatch(categoryAction.staffAll());
      closeAdd();
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      Date: "",
      email: "",
      address: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="overlay">
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h4>Thêm nhân viên</h4>
          <i className="fa-solid fa-xmark" onClick={closeAdd}></i>
        </div>
        <div>
          <label className="form-label" htmlFor="userName">
            Họ và tên
          </label>
          <input
            id="userName"
            type="text"
            className="form-control"
            name="userName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          {formik.touched.userName && formik.errors.userName && (
            <div>{formik.errors.userName}</div>
          )}
        </div>
        <div>
          <label className="form-label" htmlFor="dateOfBirth">
            Ngày sinh
          </label>
          <input
            id="dateOfBirth"
            type="date"
            className="form-control"
            name="Date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Date}
          />
          {formik.touched.Date && formik.errors.Date && (
            <div>{formik.errors.Date}</div>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="form-control"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="address">
            Địa chỉ
          </label>
          <textarea
            className="form-control"
            id="address"
            rows="3"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          ></textarea>
          {formik.touched.address && formik.errors.address && (
            <div>{formik.errors.address}</div>
          )}
        </div>
        <div>
          <button className="w-100 btn btn-primary" type="submit">
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
