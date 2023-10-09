import {
    useState,
    useMemo,
    useCallback,
    useEffect,
    memo,
} from 'react';
import Products from './Products';
import Options from './Options';
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
                ItemComponent = Options;
                break;
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
                `http://localhost:5001/${orderType}/`
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

    return (<>
        <h2>주문 종류</h2>

        <p>하나의 가격</p>

        <p>총 가격:</p>

        <div
            style={{
                display: 'flex',
                flexDirection: orderType === 'options' && 'column',
            }}>
            {optionItems}
        </div>
    </>);
}

export default memo(Type);
