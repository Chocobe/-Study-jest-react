import {
    memo,
} from 'react';

/**
 * @param {{
 *      message?: string;
 * }} props 
 */
function ErrorBanner(props) {
    const {
        message = '에러입니다.',
    } = props;

    return (
        <div
            data-testid="error-banner"
            style={{
                color: '#fff',
                backgroundColor: '#ff149390',
            }}>
            {message}
        </div>
    );
}

export default memo(ErrorBanner);
