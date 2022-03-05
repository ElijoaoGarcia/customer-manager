import React from "react";
import "../assets/styles/nav.css";
import {
  AiOutlineCloseCircle,
  AiOutlineUserAdd,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";

interface Props {
  title: string;
  onPressAdd?: () => void;
  onPressBack?: () => void;
  onPressAddAddress?: () => void;
  onPressDelete?: any;
}

export default function NavComponent({
  title,
  onPressAdd,
  onPressBack,
  onPressAddAddress,
  onPressDelete,
}: Props) {
  return (
    <nav id="Nav">
      {/* {!onPressAddAddress ||
        (!onPressDelete && <div className="navIcon"></div>)} */}
      {onPressAddAddress && (
        <button className="navIcon" onClick={onPressAddAddress}>
          <AiOutlinePlus size={28} />
        </button>
      )}

      {onPressDelete && (
        <button className="navIcon" onClick={onPressDelete}>
          <BsTrashFill color="#dc3545" size={28} />
        </button>
      )}
      <h1 className="navTitle">{title}</h1>
      {onPressAdd && (
        <button className="navIcon" onClick={onPressAdd}>
          <AiOutlineUserAdd size={28} />
        </button>
      )}

      {onPressBack && (
        <button className="navIcon" onClick={onPressBack}>
          <AiOutlineCloseCircle size={28} />
        </button>
      )}
    </nav>
  );
}
