import { useState } from "react";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Amine Trigui",
    image: assets.profile_pic,
    email: "aminetrigui@gmail.com",
    phone: "+216 22 333 444",
    address: {
      line1: "Route des commandants",
      line2: "3012 Sfax",
    },
    gender: "Male",
    dob: "9/2/2080",
  });
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img src={userData.image} alt="" className="w-36 rounded" />
      {isEdit ? (
        <input
          type="text"
          value={userData.name}
          onChange={(prev) => ({ ...prev, name: prev.target.value })}
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3 ">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id: </p>
          <p className="text-blue-500">{userData.email}</p>
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="tel"
              value={userData.phone}
              onChange={(prev) => ({ ...prev, phone: prev.target.value })}
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
                className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
                value={userData.address.line1}
              />
              <br />
              <input
                className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
                value={userData.address.line2}
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3 ">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="bg-gray-100 max-w-20"
              value={userData.gender}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, gender: e.target.value }));
              }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-28"
              type="date"
              value={userData.dob}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, dob: e.target.value }));
              }}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEdit ? (
          <button
            className=" border border-primary  px-8  py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(false)}
          >
            Save Information{" "}
          </button>
        ) : (
          <button
            className=" border border-primary  px-8  py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
