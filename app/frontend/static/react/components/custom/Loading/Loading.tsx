import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

export function Loading() {
  return (
    <div className="h-svh w-full flex justify-center items-center">
      <PropagateLoader />
    </div>
  );
}
