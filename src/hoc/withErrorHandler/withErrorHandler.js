import React from "react";

import Aux from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/httpErrorHandler";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, confirmErrorHandler] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal show={error} cancelPurchasing={confirmErrorHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
