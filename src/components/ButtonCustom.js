import React from 'react';

function ButtonCustom(props) {
  const { customClass, textBtn, click } = props;
  return (
    <button className={customClass} onClick={click}>
        {textBtn}
    </button>);
}

export default ButtonCustom;
