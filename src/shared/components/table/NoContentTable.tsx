import React from "react";

interface IProps {
  colSpan: number;
  message?: string;
  height?: number;
  isContent?: boolean;
}

const NoContentTable = ({
  message,
  colSpan,
  height,
  isContent = true,
}: IProps) => {
  return (
    <tr>
      <td
        style={{ height: height ? `${height}px` : `calc(100vh - 350px)`, padding: 0 }}
        colSpan={colSpan}
        className="text-center"
      >
        <div
          style={{ fontSize: "15px" }}
          className="bg-white h-100 text-center d-flex flex-column justify-content-center align-items-center"
        >
          <div className="d-flex w-100 justify-content-center align-items-center">
            <img style={{height: height && height < 200 ? 150 : 228}}
                 src="/assets/images/img_nocontent.svg"
                 className='mt-3'
                 alt=""
            />
          </div>
          {isContent && (
            <span style={{ color: "#ccc", fontSize: "14px" }}>
              {message ?? ""}
            </span>
          )}
        </div>
      </td>
    </tr>
  );
};

export default NoContentTable;
