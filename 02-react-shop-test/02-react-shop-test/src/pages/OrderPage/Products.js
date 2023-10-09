import {
    memo,
} from 'react';

/**
 * @param {{
 *      name: string;
 *      imagePath: string;
 * }} props 
 */
function Products(props) {
    const {
        name,
        imagePath,
    } = props;

    return (
        <div 
            style={{
                textAlign: 'center',
            }}>
            <img
                style={{
                    width: '75%',
                }}
                src={`http://localhost:5000/${imagePath}`}
                alt={`${name} product`} />

            <form 
                style={{
                    marginTop: '10px',
                }}>
                <label
                    style={{
                        textAlign: 'right',
                    }}>
                    {name}
                </label>

                <input
                    style={{
                        marginLeft: '8px',
                    }}
                    type="number"
                    name="quantity"
                    min={0}
                    defaultValue={0} />
            </form>
        </div>
    )
}

export default memo(Products);
