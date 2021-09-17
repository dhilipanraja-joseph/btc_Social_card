import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { User } from '../features/socialCard/socialSlice';
import { useAppDispatch } from '../app/hooks';
import { addNewUser } from '../features/socialCard/socialSlice';
import { v4 as uuid } from 'uuid';

interface IState {
    user: User
}

const useStyles = createUseStyles({
    addUserWrapper: {
        textAlign: 'center',
        width: '990px',
        background: '#FFFFFF',
        borderRadius: '16px',
        margin:'auto',
        padding:'10px 0px',
        '& input': {
            display: 'block',
            width: '50%',
            margin: '10px auto',
            fontSize: '15px',
            height: '20px',
            border: '.5px solid rgba(0, 0, 255, 0.2)',
            borderRadius: '5px',
            padding: '5px'
        },
        '& button': {
            width: '50%',
            margin: '10px auto',
            height: '40px',
            border: '.5px solid rgba(0, 0, 255, 0.2)',
            borderRadius: '5px',
            backgroundColor: 'rgba(0, 255, 0, 0.2)'
        }
    },
    '@media screen and (max-width: 1000px)': {
        addUserWrapper: {
            width: '350px',
            margin: 'auto',
            '& input, button': {
                width: '75%'
            }     
        }
    }
});

const AddUser = (): JSX.Element => {
    
    const dispatch = useAppDispatch();
    const classes = useStyles();
    
    const userInitialState = {
        id: '',
        name: '',
        address: '',
        photo: '',
        email: '',
        phone: '',
        website: '',
        company: '',
        editFlag: false,
        companyLogo: '',
        catchPhrase: '',
    }
    
    const [user, setUser] = useState<IState['user']>(userInitialState);
    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        let { value, name } = e.target;
        if (name === 'phone') {
            value = value.replace(/\D/ig, '');
        }
        setUser({
            ...user,
            [name]: value
        })
    };

    const addUser = (user: User) => {
        user.id = uuid();
        dispatch(addNewUser(user));
        setUser({ ...userInitialState });
    }

    return (
        <div className={classes.addUserWrapper}>
            <h2>Add User</h2>
            <input 
                type='text' 
                name='name' 
                value={user.name} 
                id='addUser-name' 
                placeholder= 'Name'
                onChange={handleChange} 
                className='addUser-input'
            />
             <input 
                type='text' 
                name='address' 
                value={user.address} 
                id='addUser-address' 
                placeholder= 'Address'
                onChange={handleChange} 
                className='addUser-input'
            />
             <input 
                type='text' 
                name='photo' 
                value={user.photo} 
                id='addUser-photo' 
                placeholder= 'Photo URL'
                onChange={handleChange} 
                className='addUser-input'
            />
             <input 
                type='text' 
                name='phone' 
                value={user.phone} 
                id='addUser-phone' 
                placeholder= 'Phone'
                onChange={handleChange} 
                className='addUser-input'
            />
             <input 
                type='text' 
                name='email' 
                value={user.email} 
                id='addUser-email' 
                placeholder= 'Email'
                onChange={handleChange} 
                className='addUser-input'
            />
             <input 
                type='text' 
                name='website' 
                value={user.website} 
                id='addUser-website' 
                placeholder= 'Website'
                onChange={handleChange} 
                className='addUser-input'
            />
             <input 
                type='text' 
                name='company' 
                value={user.company} 
                id='addUser-company' 
                placeholder='Company'
                onChange={handleChange} 
                className='addUser-input'
            />
            <input 
                type='text' 
                name='companyLogo' 
                value={user.companyLogo} 
                id='addUser-companyLogo' 
                placeholder= 'Company Logo URL'
                onChange={handleChange} 
                className='addUser-input'
            />

            <button onClick={() => addUser(user)}> Add User </button>
        </div>
    )
}

export default AddUser;