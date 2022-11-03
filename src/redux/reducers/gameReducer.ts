import { createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'game',
    initialState: {
        link:'',
        adminLink:'' 
    },
    reducers: {
        setLink: (state, action) => {
            state.link = action.payload;
        },
        setAdminLink: (state, action) => {
            state.adminLink = action.payload;
        }
    }
})

export const {setLink, setAdminLink} = slice.actions;
export default slice.reducer; 