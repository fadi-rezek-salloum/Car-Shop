import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";

function FullscreenAlert({ message }) {
  const [show, setShow] = useState(true);

  let navigate = useNavigate();

  let closedEventHandler = () => {
    setShow(false);
    navigate('/')
  }

  return (
    <div className="modal fade show" style={{ display: show ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}  id="fullscreen-alert" tabIndex="-1" role="dialog" aria-labelledby="fullscreen-alert-label" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div className="modal-dialog modal-dialog-centered modal-lg"role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="fullscreen-alert-label">Notification</h5>
            <button type="button" className="btn btn-danger close" data-dismiss="modal" aria-label="Close" onClick={() => closedEventHandler()}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullscreenAlert;