import {
    useState,
    useMemo,
    useCallback,
    useEffect,
    memo,
} from 'react';
import Products from './Products';
import ErrorBanner from '../../components/ErrorBanner';
import axios from 'axios';

/**
 * @description <Product /> 또는 <Option /> 을 동적으로 렌더링
 * @param {{
 *      orderType: 'products' | 'options'
 * }} props 
 */
function Type(props) {
    const {
        orderType,
    } = props;

    //
    // state
    //
    const [items, setItems] = useState([]);
    const [error, setError] = useState(false);

    //
    // cache
    //
    const optionItems = useMemo(() => {
        let ItemComponent = null;

        switch (orderType) {
            case 'products': 
                ItemComponent = Products;
                break;
            case 'options':
            default:
                break;
        }

        return items.map(item => item && (
            <ItemComponent
                key={item.name}
                name={item.name}
                imagePath={item.imagePath} />
        ));
    }, [orderType, items]);

    //
    // callback
    //
    const retrieveProducts = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://localhost:5000/${orderType}/`
            );

            setItems(response.data);
        } catch(error) {
            console.error(error);
            setError(true);
        }
    }, [orderType]);

    //
    // effect
    //
    useEffect(function fetchProducts() {
        retrieveProducts();
    }, [retrieveProducts]);

    if (error) {
        return (
            <ErrorBanner message="에러가 발생했습니다." />
        );
    }

    return (
        <div>
            {optionItems}
        </div>
    );
}

export default memo(Type);
