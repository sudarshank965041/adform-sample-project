import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersListStart } from "../redux/users";

export default function CampaignList() {
  const { users, campaign } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [campaignData, setCampaignData] = useState([]);
  useEffect(() => {
    dispatch(getUsersListStart());
  }, []);

  useEffect(() => {
    if (users.data && campaign.data) {
      let finalData = campaign.data.map((camp) => {
        for (const user of users.data) {
          if (camp.userId === user.id) {
            camp["username"] = user.name;
          }
        }
        camp["username"] = camp["username"] ? camp["username"] : "Unknown User";
        return camp;
      });

      console.log("finalData", finalData);
    }
  }, [users, campaign]);
  return <div>CampaignList</div>;
}
