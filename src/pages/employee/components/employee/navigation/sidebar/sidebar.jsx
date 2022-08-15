import React from "react";
import "../../../../assets/css/sb2.css";
import "../../../../assets/css/sb2.min.css";
import "./sidebar.scss";
import { MdOutlineDashboardCustomize } from "react-icons/md"
import { AiOutlineScan } from "react-icons/ai"
import { FiClock } from "react-icons/fi"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { IoPeopleOutline } from "react-icons/io5"
import { IoPersonAddOutline } from "react-icons/io5"

const sidebar = () => {
  return (
    <div className="bg-side text-center">
      <ul
        class="navbar-nav sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <li class="nav-item mt-5">
          <a
            class="nav-link"
            href="charts.html"
          >
            <MdOutlineDashboardCustomize size={20} color="#00617F" className="mr-1" />
            <span>Dashboard</span>
          </a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            href="charts.html"
          >
            <AiOutlineScan size={20} color="#00617F" className="mr-1" />
            <span>Attendance</span>
          </a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            href="charts.html"
          >
            <FiClock size={20} color="#00617F" className="mr-1" />
            <span>Time Management</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="charts.html">
            <FaRegMoneyBillAlt size={20} color="#00617F" className="mr-1"/>
            <span>Finance</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="tables.html">
          <IoPeopleOutline size={20} color="#00617F" className="mr-1"/>
            <span>Employee</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="tables.html">
            <IoPersonAddOutline size={20} color="#00617F" className="mr-1"/>
            <span>Management</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default sidebar;
