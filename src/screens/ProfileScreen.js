import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const { userUpdateProfile } = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and Confrim Password do not match! ");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <div>
          <h1>User Profile</h1>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant="success">
                  User Profile Updated Successfully.
                </MessageBox>
              )}
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Enter Confrim Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <label />
                <button className="primary block" type="submit">
                  Update User
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
