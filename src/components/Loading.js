import React from "react";

const Loading = ({ loading }) =>
  loading ? (
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "5px solid",
        borderColor: "white rgb(141,135,130) rgb(141,135,130) rgb(141,135,130)",
        borderRadius: "50%",
        margin: "0 auto",
        animation: "spin 1s linear infinite",
      }}
    >
      <style>
        {`
          @keyframes spin{
            0%{
              transform: rotate(0deg);
            }
            100%{
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  ) : null;

  export default Loading;