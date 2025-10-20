import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { getLocations } from "@/api/apiLocation";
import Pagination from "@/components/Pagination";
import { getExperiences } from "@/api/apiExperience";
import SearchableDropdown from "@/components/SearchableDropdown";
import { useLocation } from "react-router-dom";

const JobListing = () => {
  const locationHook = useLocation();
  const [inputValue, setInputValue] = useState(() => localStorage.getItem("inputValue") || "");
  const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem("searchQuery") || "");
  const [location, setLocation] = useState(() => localStorage.getItem("location") || "");
  const [company_id, setCompany_id] = useState(() => localStorage.getItem("company_id") || "");
  const [experience, setExperience] = useState(() => localStorage.getItem("experience") || "");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jobsPerPage = 15;
  const { isLoaded } = useUser();

  const { fn: fnJobs, data: jobsData, loading: loadingJobs } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
    experience,
    page,
    limit: jobsPerPage,
  });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);
  const { fn: fnLocations, data: locations } = useFetch(getLocations);
  const { fn: fnExperiences, data: experiences } = useFetch(getExperiences);

  useEffect(() => {
    if (isLoaded) {
      fnLocations();
      fnCompanies();
      fnExperiences();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, page, searchQuery, experience]);

  useEffect(() => {
    if (jobsData?.count) {
      setTotalPages(Math.ceil(jobsData.count / jobsPerPage));
    }
  }, [jobsData]);

  const saveToLocalStorage = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  };

  useEffect(() => {
    saveToLocalStorage({ inputValue, searchQuery, location, company_id, experience });
  }, [inputValue, searchQuery, location, company_id, experience]);

  const clearLocalStorageKeys = (...keys) => {
    keys.forEach((key) => localStorage.removeItem(key));
  };

  useEffect(() => {
    const currentPath = locationHook.pathname;
    return () => {
      if (currentPath === "/jobs") {
        clearLocalStorageKeys("inputValue", "searchQuery", "location", "company_id", "experience");
      }
    };
  }, [locationHook.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setPage(1);
  };

  const clearFilters = () => {
    setCompany_id("");
    setLocation("");
    setExperience("");
    setPage(1);
    clearLocalStorageKeys("location", "company_id", "experience");
  };

  const handleReset = () => {
    setInputValue("");
    setSearchQuery("");
    setLocation("");
    setCompany_id("");
    setExperience("");
    setPage(1);
    clearLocalStorageKeys("inputValue", "searchQuery", "location", "company_id", "experience");
  };

  const handleLocationChange = (value) => {
    setLocation(value);
    setPage(1);
  };

  const handleCompanyChange = (value) => {
    setCompany_id(value);
    setPage(1);
  };

  const handleExperienceChange = (value) => {
    setExperience(value);
    setPage(1);
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#016fb9" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-4xl sm:text-5xl text-center py-7">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-12 flex w-full gap-2 items-center mb-2"
      >
        <Input
          type="text"
          placeholder="Search Jobs By Title.."
          name="search-query"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
        <Button
          type="button"
          onClick={handleReset}
          className="h-full sm:w-28"
          variant="destructive"
        >
          Reset
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2 mb-2">
        <SearchableDropdown
          options={locations?.map(({ city, id }) => ({
            value: String(id),
            label: city,
          })) || []}
          placeholder="Filter by location"
          value={String(location)}
          onSelect={handleLocationChange}
        />
        <SearchableDropdown
          options={companies?.map(({ name, id }) => ({
            value: String(id),
            label: name,
          })) || []}
          placeholder="Filter by company"
          value={String(company_id)}
          onSelect={handleCompanyChange}
        />
        <SearchableDropdown
          options={experiences?.map(({ exp, id }) => ({
            value: String(id),
            label: exp,
          })) || []}
          placeholder="Filter by experience"
          value={String(experience)}
          onSelect={handleExperienceChange}
        />
        <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2">
          Clear Filters
        </Button>
      </div>

      {loadingJobs && <BarLoader className="mb-4" width={"100%"} color="#016fb9" />}

      {!loadingJobs && (
        <>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobsData?.data?.length ? (
              [...jobsData.data]
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    savedInit={job.saved.length > 0}
                  />
                ))
            ) : (
              <div>No Jobs Found</div>
            )}
          </div>

          {!loadingJobs && jobsData?.data?.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default JobListing;
