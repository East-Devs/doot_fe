import React from "react";

interface UserDescriptionProps {
  basicDetails: any;
}
const UserDescription = ({ basicDetails }: UserDescriptionProps) => {
  return (
    <>
      <div>
        <div className="d-flex py-2">
          <div className="flex-shrink-0 me-3">
            <i className="bx bx-user align-middle text-muted"></i>
          </div>
          <div className="flex-grow-1">
            <p className="mb-0">
              {basicDetails && basicDetails.fullname
                ? basicDetails.fullname
                : "-"}
            </p>
          </div>
        </div>

        <div className="d-flex py-2">
          <div className="flex-shrink-0 me-3">
            <i className="bx bx-envelope align-middle text-muted"></i>
          </div>
          <div className="flex-grow-1">
            <p className="mb-0">
              {basicDetails && basicDetails.email ? basicDetails.email : "-"}
            </p>
          </div>
        </div>

        {/* <div className="d-flex py-2">
          <div className="flex-shrink-0 me-3">
            <i className="bx bx-location-plus align-middle text-muted"></i>
          </div>
          <div className="flex-grow-1">
            <p className="mb-0">
              {basicDetails && basicDetails.location
                ? basicDetails.location
                : "-"}
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default UserDescription;
