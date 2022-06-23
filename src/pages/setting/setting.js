import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { CustomLoader } from "../../components/customLoader/customloader";
import { postUserData } from "../../slices/userSlice";
import "./setting.css";

function Setting() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.authReducer);
    const { isLoading, loggedInUser } = useSelector(
        (state) => state.userReducer
    );
    const navigation = useNavigate();

    const [userData, setUserData] = useState({
        username: loggedInUser.username,
        bio: loggedInUser.bio,
        portfolio: loggedInUser.portfolio,
        picture: loggedInUser.picture,
    });
    const { username, bio, portfolio, picture } = userData;

    const onInputChangeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.id]: e.target.value,
        });
    };

    const postUserDataClickHandler = (e) => {
        try {
            e.preventDefault();
            dispatch(postUserData({ userData, token }));
            toast.success("Profile updated");
            navigation("/profile");
        } catch (error) {
            toast.error("Can't update profile.");
        }
    };

    const fileUpload = async (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            console.log(reader.result);
            reader.readyState === 2 &&
                setUserData({
                    ...userData,
                    picture: reader.result,
                });
        };
    };

    return (
        <div className="setting">
            {isLoading || !loggedInUser ? (
                <CustomLoader />
            ) : (
                <>
                    <div className="profile-picture outer-container">
                        <div className=" inner-container">
                            {picture ? (
                                <img src={picture} alt="profile picture" />
                            ) : (
                                <i className="fas fa-user-circle"></i>
                            )}
                            <label htmlFor="profile-picture-input">
                                <i className="fas fa-camera profile-picture-edit-icon"></i>
                                <input
                                    type="file"
                                    id="profile-picture-input"
                                    accept="image/*"
                                    onChange={fileUpload}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="profile-setting">
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="John Doe"
                                value={username}
                                onChange={onInputChangeHandler}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="bio"
                                placeholder="Description"
                                rows="5"
                                value={bio ?? ""}
                                onChange={onInputChangeHandler}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="website">Website</label>
                            <input
                                type="text"
                                id="portfolio"
                                placeholder="www.example.com"
                                value={portfolio ?? ""}
                                onChange={onInputChangeHandler}
                            />
                        </div>
                    </div>
                    <button
                        className="btn btn-primary br-3 text-s profile-save"
                        onClick={postUserDataClickHandler}
                    >
                        Save
                    </button>
                </>
            )}
        </div>
    );
}

export { Setting };
