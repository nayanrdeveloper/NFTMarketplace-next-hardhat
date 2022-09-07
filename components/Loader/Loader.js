import React from "react";

function Loader() {
  return (
    <div className="my-auto flex justify-center mx-auto">
      <div className="lds-spinner my-auto flex justify-center mx-auto">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
