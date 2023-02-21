import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EnhancedTable from "../components/EnhancedTable";
import { getUsersListStart } from "../redux/users";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "username", label: "User Name", minWidth: 100 },
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 170,
  },
  {
    id: "endDate",
    label: "End Date",
    minWidth: 170,
  },
  {
    id: "status",
    label: "Active",
    minWidth: 170,
  },
  {
    id: "Budget",
    label: "Budget",
    minWidth: 170,
  },
];
export default function CampaignList() {
  const { users, campaign } = useSelector((state) => state);
  const [value, setValue] = React.useState([null, null]);
  const dispatch = useDispatch();
  const [campaignData, setCampaignData] = useState([]);
  const [totalCampaignData, setTotalCampaignData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getUsersListStart());
  }, []);

  useEffect(() => {
    if (users.data && campaign.data) {
      const today = new Date();
      let finalData = campaign.data.map((camp) => {
        for (const user of users.data) {
          if (camp.userId === user.id) {
            camp["username"] = user.name;
          }
        }
        camp["username"] = camp["username"] ? camp["username"] : "Unknown User";
        const startDate = new Date(camp.startDate);
        const endDate = new Date(camp.endDate);
        camp["status"] =
          today.getTime() >= startDate.getTime() &&
          today.getTime() <= endDate.getTime()
            ? "Active"
            : "Inactive";
        return camp;
      });
      setCampaignData(finalData);
      setTotalCampaignData(finalData);
      setValue([null, null]);
      setSearch("");
    }
  }, [users, campaign]);

  const onDateRangeChange = (daterange) => {
    setValue(daterange);
    if (daterange[0] && daterange[1]) {
      const startDate = daterange[0].$d;
      const endDate = daterange[1].$d;
      const filteredData = totalCampaignData.filter((camp) => {
        const sDate = new Date(camp.startDate);
        const eDate = new Date(camp.endDate);
        return (
          (sDate.getTime() >= startDate.getTime() &&
            sDate.getTime() <= endDate.getTime()) ||
          (eDate.getTime() >= startDate.getTime() &&
            eDate.getTime() <= endDate.getTime())
        );
      });
      setCampaignData(filteredData);
    }
  };

  const searchByName = (search) => {
    const filteredData = totalCampaignData.filter((camp) => {
      return camp.name
        ? camp.name.toLowerCase().includes(search.toLowerCase())
        : false;
    });
    setCampaignData(filteredData);
  };

  const debounce = (fun, delay) => {
    let timer;
    return function (...args) {
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fun.apply(context, args);
      }, delay);
    };
  };

  const optimisedSearch = debounce(searchByName, 300);
  return (
    <div>
      <div className="row" style={{ marginBottom: "25px" }}>
        <div className="col-sm-6">
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{ start: "Start Date", end: "End Date" }}
          >
            <DateRangePicker
              value={value}
              onChange={(newValue) => {
                onDateRangeChange(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} fullWidth />
                  <Box sx={{ mx: 2 }}> </Box>
                  <TextField {...endProps} fullWidth />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="col-sm-6">
          <TextField
            id="outlined-basic"
            label="Search by name"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setSearch(e.target.value);
              optimisedSearch(e.target.value);
            }}
            value={search}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <EnhancedTable rows={campaignData} columns={columns} />
        </div>
      </div>
    </div>
  );
}
