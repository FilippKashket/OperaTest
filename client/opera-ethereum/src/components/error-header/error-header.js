import React from 'react';
import Alert from 'react-bootstrap/Alert';

// Error header. It shows message
const ErrorHeader = ({message}) => {
    return (
        <Alert variant="danger">
          <Alert.Heading>You got an error!</Alert.Heading>
          <p>
            {message}
          </p>
        </Alert>
      );
};

export default ErrorHeader;