const Show = ({ when, children, fallback }) => (when ? children : fallback);

export default Show;
