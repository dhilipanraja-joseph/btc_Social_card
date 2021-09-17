import faker from 'faker';
import { User } from './socialSlice';
import { v4 as uuid } from 'uuid';

const generateUsers = (count = 15) => {
    return Array(count).fill({}).map(e=> {
        const { 
            name, 
            address: { 
                street, 
                suite, 
                city, 
                zipcode
            }, 
            email, 
            phone, 
            website, 
            company: {
                name : companyName,
                catchPhrase
            }
        } = faker.helpers.userCard();
        const photo = faker.image.avatar();
        const companyLogo = '';
        const user = {
            id: uuid(),
            name,
            email,
            phone,
            photo,
            website,
            companyLogo,
            catchPhrase,
            editFlag: false,
            company: companyName,
            address: `${street}, ${suite}, ${city}, ${zipcode}`
        }
        return user
    })
}

export function fetchUsers(count: number) {
    return new Promise<{data: User[]}>((resolve) => 
        setTimeout(() => resolve({ data: generateUsers(count) }), 500)
    );
}