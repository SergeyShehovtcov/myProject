import React, { FC, ReactElement } from "react";
import { Spinner as SpinnerBootsrap } from 'react-bootstrap';

const Spinner: FC = (): ReactElement => {

    return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <SpinnerBootsrap animation="border" />
        </div>
      );
};

export default Spinner;