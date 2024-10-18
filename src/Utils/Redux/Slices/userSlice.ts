import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string | null;
  name: string;
  email: string;
  phone: string;  
  city: string;   
  state: string;  
  country: string; 
  pincode: string; 
  profileimage?: string | null;  
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: null,
  name: '',
  email: '',
  phone: '',       
  city: '',        
  state: '',       
  country: '',     
  pincode: '',     
  profileimage: null, 
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        phone: string;
        city: string;
        state: string;
        country: string;
        pincode: string;
        profileimage: string | null;
      }>
    ) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.country = action.payload.country;
      state.pincode = action.payload.pincode;
      state.profileimage = action.payload.profileimage;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.id = null;
      state.name = '';
      state.email = '';
      state.phone = '';      
      state.city = '';       
      state.state = '';      
      state.country = '';    
      state.pincode = '';    
      state.profileimage = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
