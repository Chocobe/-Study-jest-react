import Type from './Type';

function OrderPage() {
    return (
        <div>
            <h1>
                Travel Products
            </h1>

            <div>
                <Type orderType="products" />
            </div>

            <div
                style={{
                    display: 'flex',
                    marginTop: '20px',
                }}>
                <div
                    style={{
                        width: '50%',
                    }}>
                    <Type orderType="options" />
                </div>

                <div
                    style={{
                        width: '50%',
                    }}>
                    <h2>
                        Total Price:
                    </h2>

                    <br />

                    <button>
                        주문
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderPage;
