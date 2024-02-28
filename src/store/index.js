import { configureStore } from "@reduxjs/toolkit";
import { categoryAction, categoryReducer } from "./slice/staff.slice";


export const store = configureStore({
    reducer: {
        categoryStore: categoryReducer
    }
  
})
store.dispatch(categoryAction.staffAll());
// store.dispatch(
//   categoryAction.editStaff({
//     id: 1,
//     data: {
//       /* Dữ liệu cần sửa */
//     },
//   })
// );
 store.dispatch(categoryAction.deleteStaff(1));