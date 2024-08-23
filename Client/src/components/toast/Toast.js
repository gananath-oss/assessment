// import React, {  useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

// const Toast = ({ message, type, showToast, onClose }) => {
//   useEffect(() => {
//     if (showToast) {
//       const toastElement = document.getElementById("toast");
//       const bootstrapToast = new bootstrap.Toast(toastElement);
//       bootstrapToast.show();
//     }
//   }, [showToast]);

//   return (
//     <div
//       id="toast"
//       className={`toast align-items-center text-bg-${type} border-0 position-fixed bottom-0 start-50 translate-middle-x mb-3`}
//       role="alert"
//       aria-live="assertive"
//       aria-atomic="true"
//     >
//       <div className="d-flex">
//         <div className="toast-body">{message}</div>
//         <button
//           type="button"
//           className="btn-close btn-close-white me-2 m-auto"
//           data-bs-dismiss="toast"
//           aria-label="Close"
//           onClick={onClose}
//         ></button>
//       </div>
//     </div>
//   );
// };

// export default Toast;
