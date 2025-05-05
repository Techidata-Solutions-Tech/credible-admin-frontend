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
      <div className="bg-white p-2">
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
        <div className="flex gap-2 mb-2 flex-wrap justify-between w-[100%]">
  {/* Filter Dropdown */}
  <div className="dropdown">
    <div
      tabIndex={0}
      role="button"
      className="min-w-[150px] py-3 text-center bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base flex items-center justify-center gap-2"
    >
      Filter
      <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
      </svg>
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

  {/* Search Input */}
  <div className="flex-1 max-w-lg">
    <label className="input bg-white border-blue-200 focus-within:border-blue-400 flex items-center gap-2 w-full">
      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        className="grow text-blue-900 placeholder:text-center placeholder-blue-400"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
    </label>
  </div>

  {/* Sort Dropdown */}
  <div className="w-full md:w-auto">
    <select
      className="select min-w-[150px] text-center w-full md:max-w-[100px] bg-white text-blue-500 font-semibold border border-blue-500 px-2 sm:px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base"
      value={sortOption}
      onChange={handleSortChange}
    >
      <option value="default">Sort</option>
      <option value="index-asc">Index (Low to High)</option>
      <option value="index-desc">Index (High to Low)</option>
      <option value="position-asc">Position (A-Z)</option>
      <option value="position-desc">Position (Z-A)</option>
    </select>
  </div>
</div>

        {loading ? (
          <Loader />
        ) : (
          <BannerTable setToggle={setToggle} banners={filteredBanners} />
        )}
      </div>
  );
};

export default Banner;
