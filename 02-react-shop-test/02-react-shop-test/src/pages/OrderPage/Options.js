import {
    memo,
} from 'react';

/**
 * @param {{
 *      name: string;
 * }} props 
 */
function Options(props) {
    const {
        name,
    } = props;

    return (
        <form>
            <input
                type="checkbox"
                id={name} />

            &nbsp;

            <label htmlFor={name}>
                {name}
            </label>
        </form>
    );
}

export default memo(Options);
