import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import { User } from '../features/socialCard/socialSlice';
import { useAppDispatch } from '../app/hooks';
import { removeEditFlag, editUser } from '../features/socialCard/socialSlice';

interface IProps {
    user : User
}

const useStyles = createUseStyles({
    editUserWrapper: {
        textAlign: 'center',
        width: '990px',
        height: '400px',
        background: '#FFFFFF',
        borderRadius: '16px',
        margin:'20px',
        boxShadow: '0px 0px 10px 1px rgba(0, 0, 255, 0.2)'
    },
    buttonGroup: {
        '& button': {
            height: '40px',
            border: '.5px solid rgba(0, 0, 255, 0.2)',
            borderRadius: '5px',
        }
    },
    inputs: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: '10px',
        '& input': {
            marginBottom: '2px',
            fontSize: '15px',
            height: '20px',
            border: '.5px solid rgba(0, 0, 255, 0.2)',
            borderRadius: '5px',
            padding: '2px'
        }
    },
    '@media screen and (max-width: 990px)': {
        editUserWrapper: {
            width: '318px',
            margin: '15px'
        }
    }
});

const EditUser = (props: IProps) => {
    const [user, setUser] = useState(props.user);
    const dispatch = useAppDispatch();
    const classes = useStyles();

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
    
    return (
        <div className={classes.editUserWrapper}>
            <h2>Modify Info</h2>
            <div className={classes.inputs}>
                <input 
                    type='text' 
                    name='name' 
                    value={user.name} 
                    id='editUser-name' 
                    placeholder= 'Name'
                    onChange={handleChange} 
                    className='editUser-input'
                />
                <input 
                    type='text' 
                    name='address' 
                    value={user.address} 
                    id='editUser-address' 
                    placeholder= 'Address'
                    onChange={handleChange} 
                    className='editUser-input'
                />
                <input 
                    type='text' 
                    name='photo' 
                    value={user.photo} 
                    id='editUser-photo' 
                    placeholder= 'Photo URL'
                    onChange={handleChange} 
                    className='editUser-input'
                />
                <input 
                    type='text' 
                    name='phone' 
                    value={user.phone} 
                    id='editUser-phone' 
                    placeholder= 'Phone'
                    onChange={handleChange} 
                    className='editUser-input'
                />
                <input 
                    type='text' 
                    name='email' 
                    value={user.email} 
                    id='editUser-email' 
                    placeholder= 'Email'
                    onChange={handleChange} 
                    className='editUser-input'
                />
                <input 
                    type='text' 
                    name='website' 
                    value={user.website} 
                    id='editUser-website' 
                    placeholder= 'Website'
                    onChange={handleChange} 
                    className='editUser-input'
                />
                <input 
                    type='text' 
                    name='company' 
                    value={user.company} 
                    id='editUser-company' 
                    placeholder='Company'
                    onChange={handleChange} 
                    className='editUser-input'
                />
                <input 
                    type='text' 
                    name='companyLogo' 
                    value={user.companyLogo} 
                    id='editUser-companyLogo' 
                    placeholder= 'Company Logo URL'
                    onChange={handleChange} 
                    className='editUser-input'
                />
            </div>
            <div className={classes.buttonGroup}>
                <button onClick={() => dispatch(editUser({user, id: user.id}))}> Update </button>
                <button onClick={() => dispatch(removeEditFlag(user.id))}> Discard </button> 
            </div>
        </div>
    )
}

export default EditUser;