const BlockAccountModal = (closeBlock, id) => {
  console.log("object", closeBlock, id);
  return (
    <div className="overlay" hidden>
      <div className="modal-custom">
        <div className="modal-title">
          <h4>Cảnh báo</h4>

          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="modal-body-custom">
          <span>Bạn có chắc chắn muốn chặn tài khoản này?</span>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light">Hủy</button>
          <button className="btn btn-danger">Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export default BlockAccountModal;
