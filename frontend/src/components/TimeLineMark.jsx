const TimeLineMark = ({ children, name, height }) => {
    return (
        <div className={name} style={{ height: height }}>
            {children}
        </div>
    );
}







export default TimeLineMark;