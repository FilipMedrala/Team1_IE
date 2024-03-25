
import PropTypes from 'prop-types';
 
const ProgressBar = ({ value=1, color='#ccc' }) => {
  const width = `${value}%`;
  return (
    <div style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
      <div style={{ width, height: '20px', backgroundColor: color }} />
    </div>
  );
};
 
ProgressBar.defaultProps = {
  color: 'blue'
};
 
ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
};
 
export default ProgressBar;