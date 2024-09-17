import { FaCheck } from "react-icons/fa6";
import { getStoragePath, getFullName } from "@/lib/helper";

const UserSelectItem = ({ option, checked }) => {
  const { label, firstName, lastName, officialID, image } = option;

  // const label = [getFullName(firstName, lastName), officialID]
  //   .filter(Boolean)
  //   .join(" - ");

  return (
    <div className="w-100 d-flex justify-content-between align-items-center">
      <div className="d-flex justify-content-start align-items-center">
        <img
          className="user_select_item_image"
          src={image ? getStoragePath(image) : "/default-profile.png"}
          alt=""
          onError={(e) => (e.target.src = "/default-profile.png")}
        />
        <div className="user_select_item_name ms-2">{label}</div>
      </div>

      {checked && <FaCheck className="user_select_item_icon ms-2" />}
    </div>
  );
};

export default UserSelectItem;
