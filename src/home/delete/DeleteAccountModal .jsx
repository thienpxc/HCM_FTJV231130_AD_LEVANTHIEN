import { useDispatch } from "react-redux";
import { categoryAction } from "../../store/slice/staff.slice";

const DeleteAccountModal = ({ closeDelete,id }) => {
  console.log(closeDelete,id);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(categoryAction.deleteStaff(id));
    closeDelete();
  };
  return (
    <div className="overlay">
      <div className="modal-custom">
        <div className="modal-title">
          <h4>Cảnh báo</h4>
          <i className="fa-solid fa-xmark" onClick={closeDelete}></i>
        </div>
        <div className="modal-body-custom">
          <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light" onClick={closeDelete}>
            Hủy
          </button>
          <button className="btn btn-danger" onClick={()=>{
            handleDelete();
            closeDelete();
          }}>Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
