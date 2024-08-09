const HeaderButton = ({index, title}) => {
    return (
        <div
            key={index}
            style={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 500,
                fontSize: '17px',
                color: '#FFFFFF',
                lineHeight: '20px',
            }}
            className={`block pt-3 mb-2 text-lg text-left border-t-2 text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light border-gray-400 dark:border-secondary-dark ${
                index === 0 ? 'border-t-0' : ''
            }`}
        >
            {title}
        </div>
    )
}

export default HeaderButton;