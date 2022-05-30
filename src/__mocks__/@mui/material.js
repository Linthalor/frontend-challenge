const genMockComponent = (name) => (props) => {
  const MockName = `mocked-mui-${name}`;
  const {sx, ...remainingProps} = props;
  return <MockName {...remainingProps} sx={sx ? JSON.stringify(sx) : undefined} />;
}

module.exports = {
  ...jest.requireActual('@mui/material'),
  Box: genMockComponent('box'),
  Button: genMockComponent('button'),
  IconButton: genMockComponent('icon-button'),
  InputAdornment: genMockComponent('input-adornment'),
  TextField: genMockComponent('text-field'),
  Typography: genMockComponent('typography'),
  Card: genMockComponent('card'),
  CardContent: genMockComponent('card-content'),
  CardActions: genMockComponent('card-actions'),
};