import Type from '../Type';
import {
    render,
    screen,
} from '@testing-library/react';
import { 
    rest,
} from 'msw';
import { 
    server,
} from '../../../mocks/server';

describe.only('Type.js 테스트', () => {
    test('display product images from server', async () => {
        render(<Type orderType="products" />);

        const productImages = await screen.findAllByRole('img', {
            name: /product$/i,
        });

        expect(productImages).toHaveLength(2);

        const altTexts = productImages.map(element => element.alt);

        expect(altTexts).toEqual([
            'Ameria product', 
            'England product'
        ]);
    });

    test('when fetching product data, face an error', async () => {
        server.resetHandlers(
            rest.get('https://localhost:5000/products/', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        );

        render(<Type orderType="products" />);

        const errorBanner = await screen.findByTestId('error-banner');

        expect(errorBanner).toHaveTextContent('에러가 발생했습니다.');
    });
});
