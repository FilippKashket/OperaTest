import React from 'react';
import Overlay from 'react-bootstrap/Overlay';

//Element with overlay lable
const Warning = ({target, show, message}) => {
    return(
        <Overlay target={target} show={show} placement="right">
        {({ placement, arrowProps, show: _show, popper, ...props }) => (
          <div
            {...props}
            style={{
              backgroundColor: 'rgba(255, 100, 100, 0.85)',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            {message}
          </div>
        )}
      </Overlay>
    )
};

export default Warning;
