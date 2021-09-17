import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getUsers, fetchUsersAsync, User } from '../features/socialCard/socialSlice';
import SocialCard from './SocialCard';
import EditUser from './EditUser';

const useStyles = createUseStyles({
    userProfileView: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    }
});

// const chunk = (arr: object[], size= 15) => {
//     return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
//       arr.slice(i * size, i * size + size)
//     );
// }

const UserProfiles = () => {
    const { users, usersStatus } = useAppSelector(getUsers);
    const dispatch = useAppDispatch();
    const classes = useStyles();

    const initialState = {
        page: 1,
        userPage: []
    }
    
    const [state, setState] = useState(initialState);
    // const userPages = chunk(users);
    
    useEffect(() => {
        dispatch(fetchUsersAsync(15));
    }, []);
    
    
    const cards = users.map(user => {
        if (user.editFlag) return <EditUser key={user.id} user={user} />
        else return <SocialCard key={user.id} user={user} />
    })

    return (
        <div>
            <div className={classes.userProfileView} >
                {cards}
            </div>
            {/* <div style={{ textAlign: 'center'}}>
                {userPages.map((e, i)=> <button key={i} onClick={()=> setState({...state, page: i+1})}>{i+1}</button>)}
            </div> */}
        </div>
    )
};

export default UserProfiles;