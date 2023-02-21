import { addCampaignSuccess } from "../redux/campaigns";
import { store } from "../redux/store";

export default function AddCampaigns(campaignData) {
  let finalData = [];
  if (campaignData && campaignData.length) {
    for (const camp of campaignData) {
      const {
        id = "",
        name = "",
        startDate = "",
        endDate = "",
        Budget = "",
        userId = "",
      } = camp;
      finalData = [
        ...finalData,
        { id, name, startDate, endDate, Budget, userId },
      ];
    }
  }
  store.dispatch(addCampaignSuccess(finalData));
}
