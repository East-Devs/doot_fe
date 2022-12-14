import React, { useEffect } from "react";

// hooks
import { useRedux } from "../../../hooks/index";
import { useProfile } from "../../../hooks/index";

// components
import Loader from "../../../components/Loader";
import AppSimpleBar from "../../../components/AppSimpleBar";
import MyProfile from "./MyProfile";
import UserDescription from "./UserDescription";
import Media from "../../../components/Media";
import AttachedFiles from "../../../components/AttachedFiles";

// actions
import { getProfileDetails } from "../../../redux/actions";

interface IndexProps {}
const Index = (props: IndexProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();
  const {userProfile} = useProfile()

  const { profileDetails, getProfileLoading, isProfileFetched,user } =
    useAppSelector(state => ({
      profileDetails: state.Profile.profileDetails,
      getProfileLoading: state.Profile.getProfileLoading,
      isProfileFetched: state.Profile.isProfileFetched,
      user: state.Login.user,
    }))

  // get user profile details
  useEffect(() => {
    // debugger;
    dispatch(getProfileDetails(userProfile));
  }, [dispatch]);

  return (
    <div className="position-relative">
      {/* {userProfile && !isProfileFetched && <Loader />} */}
      <MyProfile basicDetails={userProfile} />

      <AppSimpleBar className="p-4 profile-desc">
        <UserDescription basicDetails={userProfile} />
        <hr className="my-4" />

        {/* <Media media={profileDetails.media} limit={2} />

        <hr className="my-4" />

        <AttachedFiles attachedFiles={profileDetails.attachedFiles} /> */}
      </AppSimpleBar>
    </div>
  );
};

export default Index;
