import React from "react";

interface Props{
  isVisible: boolean
}

export default function EditAddress({ isVisible }: Props) {
  if (!isVisible) {
    return <div></div>;
  }
  return <div>editAddress</div>;
}
