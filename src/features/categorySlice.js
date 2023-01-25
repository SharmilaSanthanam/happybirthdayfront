// import { createSlice } from "@reduxjs/toolkit";

// // appApi
// import appApi from "../services/appApi";

// const initialState = [];

// export const categorySlice = createSlice({
//     name: "category",
//     initialState,
   
//     reducers: {
//         updateCategory: (_, action) => {
//             return action.payload;
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addMatcher(appApi.endpoints.createCategory.matchFulfilled, (_, { payload }) => payload);
//         builder.addMatcher(appApi.endpoints.updateCategory.matchFulfilled, (_, { payload }) => payload);
//         builder.addMatcher(appApi.endpoints.deleteCategory.matchFulfilled, (_, { payload }) => payload);
//     },
// });

// export const { updateCategory } = categorySlice.actions;
// export default categorySlice.reducer;