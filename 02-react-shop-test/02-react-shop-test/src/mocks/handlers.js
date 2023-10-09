import {
    rest,
} from 'msw';

export const handlers = [
    rest.get('https://localhost:5000/products/', (req, res, ctx) => {
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

    rest.get('https://localhost:5000/options/', (req, res, ctx) => {
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