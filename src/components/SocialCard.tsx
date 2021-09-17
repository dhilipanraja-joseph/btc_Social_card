import React from 'react';
import { createUseStyles } from 'react-jss';
import { AiOutlineGlobal, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { CgWorkAlt } from 'react-icons/cg';
import { FaRegAddressBook } from 'react-icons/fa';

import { useAppDispatch } from '../app/hooks';
import { setEditFlag } from '../features/socialCard/socialSlice';
import { User } from '../features/socialCard/socialSlice';

interface IProps {
    user : User
}

const useStyles = createUseStyles({
    card: {
        display: 'flex',
        width: '990px',
        height: '400px',
        background: '#FFFFFF',
        borderRadius: '16px',
        margin:'20px',
        boxShadow: '0px 0px 10px 1px rgba(0, 0, 255, 0.2)'
    },
    userName: {
        fontFamily: 'DM Serif Display',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '40px',
        lineHeight: '46px',
        color: '#081F32'
    },
    userPhoto: {
        width: '400px',
        height: '400px',
        background: 'linear-gradient(135deg, #F395BA 0%, #FED182 100%)',
        borderRadius: '16px 0px 0px 16px',
        '& img': {
            position: 'relative',
            textAlign: 'center',
            width: '223px',
            height: '223px',
            top: '85px',
            left: '85px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
        }
    },
    noPhoto: {
        position: 'relative',
        textAlign: 'center',
        fontFamily: 'Source Sans Pro',
        lineHeight: '200px',
        fontWeight: '900',
        fontSize: '110px',
        width: '223px',
        height: '223px',
        top: '85px',
        left: '85px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
    },
    userDetails: {
        width: '550px',
        height: '321px',
        '& div': {
            margin: '0px 0px 25px 40px',
        },
        '& p': {
            display: 'flex',
            verticalAlign: 'center',
            fontFamily: 'Open Sans',
            fontStyle: 'noraml',
            fontWeight: 'bold',
            fontSize: '18px',
            lineHeight: '20px',
            color: '#374A59',
        }
    },
    favIcon: {
        display: 'inline-block',
        marginRight: '15px',
        verticalAlign: 'middle',
    },
    companyInfo: {
        display: 'flex',
        '& img, svg': {
            position: 'relative',
            top: '15px',
            height: '50px',
            width: '50px',
            background: 'linear-gradient(30.85deg, #666FCF 10.93%, #FF2539 85.6%)',
        },
        '& p': {
            fontFamily: 'Source Sans Pro',
            fontSize: '20px',
            fontWeight: '900',
            lineHeight: '10px',
            color: '#555A66'
        }
    },
    pharse: {
        fontFamily: 'Source Sans Pro',
        fontSize: '18px',
        fontStyle: 'italic',
        fontWeight: 'light',
        lineHeight: '10px',
        color: '#555A66'
    }, 
    '@media screen and (max-width: 990px)': {
        card: {
            flexDirection: 'column',
            width: '318px',
            height: '400px',
            margin: '15px',
        },
        userPhoto: {
            width: '318px',
            height: '150px',
            borderRadius: '16px 16px 0px 0px',
            '& img': {
                width: '100px',
                height: '100px',
                top: '25px',
                left: '109px'
            }
        },
        noPhoto: {
            lineHeight: '100px',
            fontSize: '50px',
            width: '100px',
            height: '100px',
            top: '25px',
            left: '109px',
        },
        userDetails: {
            height: '250px',
            width: '318px',
            padding: '5px',
            '& div': {
                margin: '0px 0px 15px 25px',
            },
            '& p': {
                width: '250px',
                fontSize: '12px',
                lineHeight: '13px'
            }
        },
        userName: {
            fontSize: '20px',
        },
        companyInfo: {
            '& img, svg': {
                height: '25px',
                width: '25px',
            },
            '& p': {
                lineHeight: '5px',
            }
        },
        pharse: {
            fontSize: '12px',
        }, 
    },
});



const SocialCard = (props: IProps) => {
    const { user } = props;
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const getInitials = (name: string) => {
        return name.split(/\s/).reduce((a, w)=> a+=w.slice(0,1),'').toUpperCase();
    }

    return (
        <div className={classes.card}>
            <div 
                className={classes.userPhoto} 
                onDoubleClick={() => dispatch(setEditFlag(user.id))}
            >
                {user.photo? 
                    <img src={user.photo} alt='user_avatar' /> : 
                        <div className={classes.noPhoto}> 
                            <span>
                                {getInitials(user.name)}
                            </span>
                        </div>   
                    }
            </div>
            <div className={classes.userDetails}>
                <div>
                    <h1 className={classes.userName} >{user.name}</h1>
                    <p>
                        <AiOutlineMail className={classes.favIcon} />
                        {user.email}
                    </p>
                    <p>
                        <FaRegAddressBook className={classes.favIcon} />
                        {user.address}
                    </p>
                    <p>
                        <AiOutlinePhone className={classes.favIcon} />
                        {user.phone}
                    </p>
                    <p>
                        <AiOutlineGlobal className={classes.favIcon} />
                        {user.website}
                    </p>
                </div>
                <div className={classes.companyInfo}>  
                    {user.companyLogo?
                         <img src={user.companyLogo} />:
                         <CgWorkAlt />
                    }   
                    <div>
                        <p>{user.company}</p>
                        <p className={classes.pharse}>{user.catchPhrase}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SocialCard;