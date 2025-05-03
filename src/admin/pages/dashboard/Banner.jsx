import React, { useEffect, useState } from "react";
import BannerTable from "../../components/dashboard/BannerTable";
import Loader from "../../../components/Loader";
import Breadcrumbs from "../../components/Breadcrumbs";
const PillTabs = ({ tabs, activeTab, onTabChange }) => {
  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTab || tabs[0]?.id
  );

  React.useEffect(() => {
    if (activeTab !== undefined) {
      setInternalActiveTab(activeTab);
    }
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    setInternalActiveTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="w-full max-w-4xl p-4">
      <div className="flex flex-wrap justify-center gap-2 p-1 rounded-full bg-gray-50">
        {tabs?.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 flex flex-col gap-0 justify-center items-center
              border border-gray-200
              ${
                internalActiveTab === tab.id
                  ? "bg-cyan-500 text-white shadow-sm border-cyan-600"
                  : "text-gray-600 hover:bg-gray-100 hover:border-gray-300"
              }
            `}
          >
            <span>{tab.label.split("(")[0]}</span>
            <span>{tab.label.split("(")[1]?.replace(/\)$/, "")}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const Banner = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [toggle, setToggle] = useState(Date.now());
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const [sortOption, setSortOption] = useState("default");

  const breadcrumbItems = [
    { label: "Website Setting", href: "/admin" },
    { label: "Banners", href: "/admin/dashboard/banner/table" },
    { label: "Manage Banner", href: "/admin/dashboard/banner/table" },
  ];

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/admin/get-banner`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        if (response.status === 200) {
          setLoading(false);
          setBanners(result.data);
          setFilteredBanners(result.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchBanners();
  }, [toggle]);

  useEffect(() => {
    let result = [...banners];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (banner) =>
          banner.redirectUrl.toLowerCase().includes(term) ||
          banner.position.toLowerCase().includes(term) ||
          banner.index.toString().includes(term)
      );
    }

    if (activeTab === 2) {
      result = result.filter((banner) => banner.position === "BANNER");
    } else if (activeTab === 3) {
      result = result.filter((banner) => banner.position === "SLIDER");
    }

    switch (sortOption) {
      case "index-asc":
        result.sort((a, b) => a.index - b.index);
        break;
      case "index-desc":
        result.sort((a, b) => b.index - a.index);
        break;
      case "position-asc":
        result.sort((a, b) => a.position.localeCompare(b.position));
        break;
      case "position-desc":
        result.sort((a, b) => b.position.localeCompare(a.position));
        break;
      default:
        break;
    }

    setFilteredBanners(result);
  }, [banners, searchTerm, activeTab, sortOption]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const tabs_user = [
    { id: 1, label: `All (${banners.length})` },
    {
      id: 2,
      label: `Banner (${
        banners.filter((banner) => banner.position === "BANNER").length
      })`,
    },
    {
      id: 3,
      label: `Slider (${
        banners.filter((banner) => banner.position === "SLIDER").length
      })`,
    },
  ];

  return (
    <div className="">
      <div className="rounded shadow-lg p-2 md:p-4 m-2 bg-white">
        <Breadcrumbs pageTitle="Banners" items={breadcrumbItems} />
        <div className="w-full mb-3">
          <div className="max-w-full ">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-2 md:p-4 rounded-lg shadow-lg">
              <div className="w-full overflow-x-auto scrollbar-hide py-2">
                <div className="min-w-full flex justify-center">
                  <PillTabs
                    tabs={tabs_user}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-between w-[100%]">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="min-w-[150px] text-center bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base"
            >
              Filter
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-gray-100 text-gray-800 rounded-md z-[1] w-52 p-2 shadow"
            >
              <li>
                <label>
                  <input type="checkbox" /> Active Banners
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> With Redirect URL
                </label>
              </li>
            </ul>
          </div>
          <div className="">
            <label className="input input-bordered flex items-center gap-2 bg-transparent w-full">
              <i className="ri-search-line"></i>
              <input
                type="text"
                className="grow text-blue-900 placeholder:text-center placeholder-blue-400 min-w-[250px]"
                placeholder="Search Banner"
                value={searchTerm}
                onChange={handleSearch}
              />
            </label>
          </div>
          <select
            className="min-w-[150px] text-center bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white text-sm sm:text-base"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default">Sort By</option>
            <option value="index-asc">Index (Low to High)</option>
            <option value="index-desc">Index (High to Low)</option>
            <option value="position-asc">Position (A-Z)</option>
            <option value="position-desc">Position (Z-A)</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 container items-center w-full mt-4"></div>
        {loading ? (
          <Loader />
        ) : (
          <BannerTable setToggle={setToggle} banners={filteredBanners} />
        )}
      </div>
    </div>
  );
};

export default Banner;
