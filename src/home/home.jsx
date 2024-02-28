import AddForm from "./add/AddForm";

import BlockAccountModal from "./block/BlockAccountModal";
import DeleteAccountModal from "./delete/DeleteAccountModal ";
import { useDispatch, useSelector } from "react-redux";

import "./home.scss";
import { useState } from "react";
import { categoryAction } from "../store/slice/staff.slice";

export default function Home() {
  const dispatch = useDispatch();
  const [showBlock, setShowBlock] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const openAdd = () => {
    setShowAdd(true);
  };
  const closeAdd = () => {
    setShowAdd(false);
  };
  const openDelete = (id) => {
    setDeleteId(id);
  };

  const closeDelete = () => {
    setDeleteId(null);  
  };
  //  const openBlock = () => {
  //    setShowBlock(true);
  //   };
  const closeBlock = () => {
    setShowBlock(false);
  };
  const handleSearch = (e) => {
    setSearchEmail(e.target.value); // Cập nhật giá trị email
    dispatch(categoryAction.searchStaffByEmail(e.target.value)); // Gửi yêu cầu tìm kiếm
  };
  const handleRefresh = () => {
    dispatch(categoryAction.staffAll());
    setSearchEmail("");
  };
  const categoryStore = useSelector((store) => store.categoryStore);
  return (
    <>
      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button className="btn btn-primary" onClick={openAdd}>
              Thêm mới nhân viên
            </button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: "350px" }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
              value={searchEmail}
              onChange={handleSearch}
            />
            <i
              className="fa-solid fa-arrows-rotate"
              title="Refresh"
              onClick={handleRefresh}
            ></i>
          </div>
          {/* Danh sách nhân viên */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th colSpan="2">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {categoryStore.data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.userName}</td>
                  <td>{item.Date}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div className="status status-active"></div>
                      <span> Đang hoạt động</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className="button button-block"
                      onClick={() => {
                        setShowBlock(true);
                        console.log(item.id);
                      }}
                    >
                      Chặn
                    </span>
                  </td>
                  <td>
                    <span className="button button-edit">Sửa</span>
                  </td>
                  <td>
                    <span
                      className="button button-delete"
                      onClick={() => {
                        openDelete(item.id);
                        console.log(item.id);
                      }}
                    >
                      Xóa
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <footer className="d-flex justify-content-end align-items-center gap-3">
            <select className="form-select">
              <option selected>Hiển thị 10 bản ghi trên trang</option>
              <option>Hiển thị 20 bản ghi trên trang</option>
              <option>Hiển thị 50 bản ghi trên trang</option>
              <option>Hiển thị 100 bản ghi trên trang</option>
            </select>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </footer>
        </main>
      </div>

      {showAdd && <AddForm closeAdd={closeAdd} />}
      {/* <!-- Modal xác nhận chặn tài khoản --> */}

      {showBlock && (
        <BlockAccountModal closeBlock={closeBlock} id={showBlock} />
      )}
      {/* <!-- Modal xác nhận xóa tài khoản --> */}

      {deleteId && (
        <DeleteAccountModal closeDelete={closeDelete} id={deleteId} />
      )}
    </>
  );
}
