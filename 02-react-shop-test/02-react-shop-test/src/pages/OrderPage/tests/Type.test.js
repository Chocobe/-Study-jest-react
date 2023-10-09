import Type from '../Type';
import {
    render,
    screen,
} from '@testing-library/react';

describe.only('Type.js', () => {
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
});
