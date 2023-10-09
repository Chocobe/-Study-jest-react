import {
    rest,
} from 'msw';

export const handlers = [
    rest.get('http://localhost:5001/products/', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Ameria',
                    imagePath: '/images/ameria.jpeg',
                },
                {
                    name: 'England',
                    imagePath: 'images/england.jpeg',
                },
            ])
        );
    }),

    rest.get('http://localhost:5001/options/', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    name: 'Insurance',
                },
                {
                    name: 'Dinner',
                },
            ])
        );
    }),
];
