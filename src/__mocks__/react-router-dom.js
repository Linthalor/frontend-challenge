module.exports = {
  ...jest.requireActual('react-router-dom'),
  Navigate: (props) => {
    const MockName = `mocked-react-router-dom-navigate`;
    return <MockName {...props} />;
  }
};