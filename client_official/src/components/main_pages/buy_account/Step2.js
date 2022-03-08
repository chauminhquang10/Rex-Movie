import React, { useState, useContext, useEffect } from "react";
import "./Step2.css";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletIcon from "@mui/icons-material/Tablet";
import ComputerIcon from "@mui/icons-material/Computer";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";

import { GlobalState } from "../../../GlobalState";

import DevicesIcon from "./DevicesIcon";

const Step2 = () => {
  const state = useContext(GlobalState);
  const [packages, setPackages] = state.packagesAPI.packages;

  const [userPackage, setUserPackage] = state.usersAPI.userPackage;

  const addUserPackageService = state.usersAPI.addUserPackageService;

  //control toggle package
  const [togglePackage, setTogglePackage] = useState("");

  const handleActivePackage = (pack) => {
    addUserPackageService(pack);
    setTogglePackage(pack.title);
  };

  useEffect(() => {
    if (packages.length !== 0) {
      // ktra gói khách hàng chọn có bị admin xóa k ?
      if (
        userPackage.title &&
        packages.some((pack) => pack.title === userPackage.title)
      ) {
        setTogglePackage(userPackage.title);
      } else {
        //lấy gói đầu tiên
        setTogglePackage(packages[0].title);
      }
    }
  }, [userPackage, packages]);

  return (
    <div className="step2_container">
      <div className="step2_wrapper">
        <div className="step2_top_content">
          <div className="step2_number">
            Step <span className="step2_bold_number">2</span> of
            <span className="step2_bold_number"> 3</span>
          </div>
          <h2 className="choice_text_step2">
            Choose the plan that’s right for you
          </h2>

          <ul className="step2_checkmark_group">
            <li className="step2_checkmark_group_item">
              <CheckIcon style={{ color: "red", fontSize: "28px" }} />
              <p>Watch all you want. Ad-free.</p>
            </li>
            <li className="step2_checkmark_group_item">
              <CheckIcon
                style={{
                  color: "red",
                  fontSize: "28px",
                }}
              />
              <p>Recommendations just for you.</p>
            </li>
            <li className="step2_checkmark_group_item">
              <CheckIcon style={{ color: "red", fontSize: "28px" }} />
              <p>Change or cancel your plan anytime.</p>
            </li>
          </ul>
        </div>

        {/* Table of package contents */}
        <div className="plan_table_header">
          <div className="plan_table_header_wrapper">
            {packages.map((pack, index) => (
              <div
                className={
                  togglePackage === pack.title
                    ? "plan_table_header_item plan_table_header_item_active"
                    : "plan_table_header_item"
                }
                onClick={() => handleActivePackage(pack)}
              >
                <span className="plan_table_header_item_choice ">
                  {pack.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <table className="plan_table_body">
          <tbody>
            <tr>
              <td className="heading_content">Monthly price</td>
              {packages.map((pack, index) => (
                <td
                  className={
                    togglePackage === pack.title
                      ? "active_package_detail_content package_detail_content"
                      : "package_detail_content"
                  }
                >
                  {pack.price}&nbsp;₫
                </td>
              ))}
            </tr>
            <tr>
              <td className="heading_content">Video quality</td>
              {packages.map((pack, index) => (
                <td
                  className={
                    togglePackage === pack.title
                      ? "active_package_detail_content package_detail_content"
                      : "package_detail_content"
                  }
                >
                  {pack.video_quality}
                </td>
              ))}
            </tr>
            <tr>
              <td className="heading_content">Resolution</td>
              {packages.map((pack, index) => (
                <td
                  className={
                    togglePackage === pack.title
                      ? "active_package_detail_content package_detail_content"
                      : "package_detail_content"
                  }
                >
                  {pack.resolution}
                </td>
              ))}
            </tr>
            <tr>
              <td className="heading_content">Devices you can use to watch</td>
              {packages.map((pack, index) => (
                <td
                  className={
                    togglePackage === pack.title
                      ? "active_package_detail_content package_detail_content"
                      : "package_detail_content"
                  }
                >
                  <DevicesIcon devices={pack.devices} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div className="step2_subtexts">
          <span>
            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
            subject to your internet service and device capabilities. Not all
            content is available in all resolutions. See our{" "}
            <a
              href="https://help.netflix.com/legal/termsofuse"
              style={{ color: "#0071eb" }}
              target="_blank"
            >
              Terms of Use
            </a>{" "}
            for more details.
          </span>
          <span>
            Only people who live with you may use your account. Watch on 4
            different devices at the same time with Premium, 2 with Standard,
            and 1 with Basic and Mobile.
          </span>
        </div>
      </div>
      <Link to="/step_3">
        <button type="button" className="step2_next_btn">
          Next
        </button>
      </Link>
    </div>
  );
};

export default Step2;