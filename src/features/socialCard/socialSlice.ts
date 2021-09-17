import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchUsers } from './socialAPI';

export interface User {
    id: string
    name: string
    email: string
    phone: string
    photo?: string
    address: string
    website: string
    company: string
    editFlag: boolean 
    catchPhrase?: string
    companyLogo?: string
}

export interface Social {
    users: User[]
    usersStatus: string
}

interface editPayload {
    id: string
    user: User
}

const initialState: Social = {
    users: [],
    usersStatus: 'idle'
}

export const fetchUsersAsync = createAsyncThunk(
    'socialCard/fetchUsers',
    async (count: number) => {
        const response = await fetchUsers(count);
        return response.data;
    }
)

export const socialSlice = createSlice({
    name: 'social',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        editUser: (state, action: PayloadAction<editPayload>) => {
            const { id, user } = action.payload;
            const userIndex = state.users.findIndex(user => user.id === id);
            state.users[userIndex] = { ...user, id, editFlag: false };
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users.filter(user => user.id !== action.payload);
        },
        setEditFlag: (state, action: PayloadAction<string>) => {
            const id = action.payload; 
            const userIndex = state.users.findIndex(user => user.id === id);
            state.users[userIndex] = { ...state.users[userIndex], editFlag: true };
        },
        removeEditFlag: (state, action: PayloadAction<string>) => {
            const id = action.payload; 
            const userIndex = state.users.findIndex(user => user.id === id);
            state.users[userIndex] = { ...state.users[userIndex], editFlag: false };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAsync.pending, (state) => {
                state.usersStatus = 'loading';
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.usersStatus = 'idle';
                state.users = action.payload;
            })
    }
});


export const { addNewUser, editUser, deleteUser, setEditFlag, removeEditFlag } = socialSlice.actions;

export const getUsers = (state: RootState) => state.users;

export default socialSlice.reducer;