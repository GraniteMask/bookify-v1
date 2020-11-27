import bcrypt from 'bcryptjs'
const data = {
    users: [
        {
            name: 'Admin',
            email:'admin@admin.com',
            password: bcrypt.hashSync('1234', 12),
            isAdmin: true,
        },
        {
            name: 'RD',
            email:'rd@rd.com',
            password: bcrypt.hashSync('1234', 12),
            isAdmin: false,
        },
    ],
    products:[{
        // _id: '1',
        name: 'Slim shirt',
        category: 'Shirts',
        image: '/images/p1.jpg',
        price: 60,
        brand: 'Nike',
        countInStock: 0,
        rating: 4.5,
        numReviews: 15,
        description: 'Nice product'
    },
    {   
        // _id: '2',
        name: 'Fit shirt',
        category: 'Shirts',
        image: '/images/p1.jpg',
        price: 50,
        countInStock: 10,
        brand: 'Nike',
        rating: 5.0,
        numReviews: 1,
        description: 'Nice product'

    },
    {
        // _id: '3',
        name: 'Best Pant',
        category: 'Pants',
        image: '/images/p1.jpg',
        price: 100,
        countInStock: 25,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 11,
        description: 'Nice product'

    },
]
}

export default data